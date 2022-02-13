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
                <h3 class="card-title">About Us Update Form</h3>
              </div>

              <form @submit.prevent="updateAbout()">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label for="title">Title</label>
                        <input
                          type="text"
                          v-model="form.title"
                          class="form-control"
                          placeholder="Enter Title"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label>Short Description</label>
                        <textarea
                          class="form-control"
                          rows="3"
                          placeholder="Enter Here..."
                          v-model="form.short_description"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-2">
                      <div class="form-group">
                        <label for="title">Experice Year</label>
                        <input
                          type="text"
                          v-model="form.year_of_experienced"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div class="form-group">
                        <label for="title">Complete Project</label>
                        <input
                          type="text"
                          v-model="form.project_complete"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div class="form-group">
                        <label for="title">Our Member</label>
                        <input
                          type="text"
                          v-model="form.our_member"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="form-group">
                        <label for="title">Service Provide</label>
                        <input
                          type="text"
                          v-model="form.service_provide"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="form-group">
                        <label for="title">Happy Customer</label>
                        <input
                          type="text"
                          v-model="form.happy_customers"
                          class="form-control"
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
  name: "Edit",
  components: { Breadcrumb },

  data() {
    return {
      form: {},
    };
  },

  mounted() {
    this.getAbout();
  },

  methods: {
    async getAbout() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      await axios
        .get("http://127.0.0.1:8000/api/about-us/show")
        .then((response) => {
          console.log(response.data.data);
          this.form = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // async getAbout() {
    //   // let instance = this;
    //   axios.defaults.headers.common["Authorization"] =
    //     "Bearer " + this.$store.state.token;
    //   try {
    //     const {
    //       data: { data: asData },
    //     } = await axios.get(`http://127.0.0.1:8000/api/about-us/show`);
    //     console.log(asData, "as data");
    //     this.form = asData;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    updateAbout() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      var formData = new FormData();
      formData.append("id", this.form.id);
      formData.append("title", this.form.title);
      formData.append("short_description", this.form.short_description);
      formData.append("project_complete", this.form.project_complete);
      formData.append("year_of_experienced", this.form.year_of_experienced);
      formData.append("our_member", this.form.our_member);
      formData.append("service_provide", this.form.service_provide);
      formData.append("happy_customers", this.form.happy_customers);

      let instance = this;
      axios
        .post(
          `http://127.0.0.1:8000/api/about-us/update/${this.form.id}`,
          formData
        )
        .then(function () {
          Swal.fire({
            icon: "success",
            title: "About-us Updated Successfully",
          });
          instance.$router.push("/admin/about-us");
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
