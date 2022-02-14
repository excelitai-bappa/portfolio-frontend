<template>
  <div>
    <breadcrumb title="Edit Project Category" />

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-dark">
              <div class="card-header">
                <h3 class="card-title">Project Category Update Form</h3>
                <router-link
                  :to="{ name: 'project_categories' }"
                  class="btn btn-primary btn-sm text-light"
                  style="float: right"
                  >Back</router-link
                >
              </div>

              <form
                @submit.prevent="updateCategory()"
                enctype="multipart/form-data"
              >
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="title">Category Name</label>
                        <input
                          type="text"
                          v-model="form.name"
                          class="form-control"
                          placeholder="Enter Category Name"
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
    this.getCategories();
  },

  methods: {
    async getCategories() {
      // let instance = this;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      await axios
        .get(`http://127.0.0.1:8000/api/category/show/${this.id}`)
        .then((response) => {
          this.form = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    updateCategory() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      var formData = new FormData();
      formData.append("name", this.form.name);

      let instance = this;
      axios
        .post(`http://127.0.0.1:8000/api/category/update/${this.id}`, formData)
        .then(function () {
          Swal.fire({
            icon: "success",
            title: "Category Updated Successfully",
          });
          instance.$router.push("/admin/project_categories");
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
