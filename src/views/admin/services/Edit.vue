<template>
  <div>
    <breadcrumb title="Edit Slider" />

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-dark">
              <div class="card-header">
                <h3 class="card-title">Service Update Form</h3>
                <router-link
                  :to="{ name: 'services' }"
                  class="btn btn-primary btn-sm text-light"
                  style="float: right"
                  >Back</router-link
                >
              </div>

              <form
                @submit.prevent="updateService()"
                enctype="multipart/form-data"
              >
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="title">Name</label>
                        <input
                          type="text"
                          v-model="form.name"
                          class="form-control"
                          placeholder="Enter Service Name"
                        />
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="sub_title">Serivce Icon URL</label>
                        <input
                          type="text"
                          v-model="form.icon_url"
                          class="form-control"
                          placeholder="Enter Service Icon URL"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import Breadcrumb from "../../../components/admin/Breadcrumb.vue";
import Swal from "sweetalert2";
import axios from "axios";

export default {
  props: ["id"],
  name: "Edit",
  components: { Breadcrumb },

  data() {
    return {
      form: {},
    };
  },

  mounted() {
    this.getService();
  },

  methods: {
    async getService() {
      // let instance = this;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      await axios
        .get(`http://127.0.0.1:8000/api/service/show/${this.id}`)
        .then((response) => {
          this.form = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    updateService() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      var formData = new FormData();
      formData.append("id", this.form.id);
      formData.append("name", this.form.name);
      formData.append("icon_url", this.form.icon_url);

      let instance = this;
      axios
        .post(`http://127.0.0.1:8000/api/service/update/${this.id}`, formData)
        .then(function () {
          Swal.fire({
            icon: "success",
            title: "Service Updated Successfully",
          });
          instance.$router.push("/admin/services");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
</style>
