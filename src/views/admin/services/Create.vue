<template>
  <div>
    <breadcrumb title="Create Slider" />
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-dark">
              <div class="card-header">
                <h3 class="card-title">Service Create Form</h3>
                <router-link
                  :to="{ name: 'services' }"
                  class="btn btn-primary btn-sm text-light"
                  style="float: right"
                  >Back</router-link
                >
              </div>
              <form @submit.prevent="addSlider()">
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
                        <label for="sub_title">Icon URL</label>
                        <input
                          type="text"
                          v-model="form.icon_url"
                          class="form-control"
                          placeholder="Enter Icon URL"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- /.card-body -->

                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Breadcrumb from "../../../components/admin/Breadcrumb.vue";
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "Create",
  components: { Breadcrumb },

  data() {
    return {
      form: {
        name: null,
        icon_url: null,
      },
    };
  },

  methods: {
    addSlider() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      var formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("icon_url", this.form.icon_url);

      let instance = this;
      axios
        .post("http://127.0.0.1:8000/api/service/create", formData)
        .then(function (response) {
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "Service Created Successfully",
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
