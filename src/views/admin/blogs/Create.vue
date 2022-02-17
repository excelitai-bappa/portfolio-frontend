<template>
  <div>
    <breadcrumb title="Blogs" />
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-dark">
              <div class="card-header">
                <h3 class="card-title">Blog Create Form</h3>
                <router-link
                  :to="{ name: 'blogs' }"
                  class="btn btn-primary btn-sm text-light"
                  style="float: right"
                  >Back</router-link
                >
              </div>
              <form @submit.prevent="addBlog()">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-4">
                      <!-- select -->
                      <div class="form-group">
                        <label>Category</label>
                        <select
                          class="form-control"
                          v-model="form.blog_category_id"
                        >
                          <option
                            v-for="(info, key) in BlogCategories"
                            v-bind:value="info.id"
                            :key="key"
                          >
                            {{ info.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-8">
                      <div class="form-group">
                        <label for="title">Title</label>
                        <input
                          type="text"
                          v-model="form.title"
                          class="form-control"
                          placeholder="Enter Blog Title"
                        />
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label>Description</label>
                        <textarea
                          class="form-control"
                          rows="5"
                          placeholder="Write Here..."
                          v-model="form.description"
                        ></textarea>
                      </div>
                    </div>

                    <div class="col-sm-3">
                      <label>Blog Thumbnail</label>
                      <div
                        class="image-input"
                        :style="{ backgroundImage: `url(${thumbnail})` }"
                        @click="chooseImage"
                      >
                        <span v-if="!form.blog_thumbnail" class="placeholder"
                          >Choose an Image</span
                        >
                        <input
                          class="file-input"
                          ref="fileInput"
                          type="file"
                          @input="onSelectFile"
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
        blog_category_id: [],
        created_by: null,
        title: null,
        description: null,
      },
      thumbnail: null,
    };
  },

  created() {
    this.$store.dispatch("getActiveBlogsCategories");
  },

  computed: {
    BlogCategories() {
      return this.$store.getters.BLOGSCATEGOROES;
    },
  },

  methods: {
    addBlog() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      var formData = new FormData();

      formData.append("blog_category_id", this.form.blog_category_id);
      formData.append("created_by", this.form.created_by);
      formData.append("title", this.form.title);
      formData.append("description", this.form.description);
      formData.append("blog_thumbnail", this.form.blog_thumbnail);

      let instance = this;
      axios
        .post("http://127.0.0.1:8000/api/blog/create", formData)
        .then(function () {
          Swal.fire({
            icon: "success",
            title: "Blog Created Successfully",
          });
          instance.$router.push("/admin/blogs");
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    chooseImage() {
      this.$refs.fileInput.click();
    },

    onSelectFile(event) {
      const input = event.target;
      console.log(event);
      const files = input.files;
      this.form.blog_thumbnail = files[0];
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.thumbnail = e.target.result;
        };
        reader.readAsDataURL(files[0]);
        this.$emit("input", files[0]);
      }
    },
  },
};
</script>
<style scoped>
.image-input {
  display: block;
  width: 300px;
  height: 300px;
  background-size: cover;
  background-position: center center;
}
.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  cursor: pointer;
  font-size: 18px;
  font-family: Helvetica;
  border: 1px solid;
}
.placeholder:hover {
  background: #e0e0e0;
}
.file-input {
  display: none;
}
</style>
