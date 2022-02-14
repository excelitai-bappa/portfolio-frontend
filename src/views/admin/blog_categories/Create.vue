<template>
  <div>
    <breadcrumb title="Create Slider" />
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-dark">
              <div class="card-header">
                <h3 class="card-title">Blog Category Create Form</h3>
                <router-link
                  :to="{ name: 'blog-categories' }"
                  class="btn btn-primary btn-sm text-light"
                  style="float: right"
                  >Back</router-link
                >
              </div>
              <form @submit.prevent="addBlogCategory()">
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
      },
    };
  },

  methods: {
    addBlogCategory() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      var formData = new FormData();
      formData.append("name", this.form.name);

      let instance = this;
      axios
        .post("http://127.0.0.1:8000/api/blog-category/create", formData)
        .then(function (response) {
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "Blog Category Created Successfully",
          });
          instance.$router.push("/admin/blog-categories");
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
