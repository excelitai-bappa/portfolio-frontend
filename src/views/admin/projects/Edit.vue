<template>
  <div>
    <breadcrumb title="Projects" />

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-dark">
              <div class="card-header">
                <h3 class="card-title">Project Update Form</h3>
                <router-link
                  :to="{ name: 'projects' }"
                  class="btn btn-primary btn-sm text-light"
                  style="float: right"
                  >Back</router-link
                >
              </div>

              <form
                @submit.prevent="updateProject()"
                enctype="multipart/form-data"
              >
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-6">
                      <!-- select -->
                      <div class="form-group">
                        <label>Category</label>
                        <select class="form-control" v-model="form.category_id" required>
                          <option
                            v-for="(info, key) in ProjectsCategories"
                            v-bind:value="info.id"
                            :key="key"
                          >
                            {{ info.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="title">Title</label>
                        <input
                          type="text"
                          v-model="form.project_title"
                          class="form-control"
                          placeholder="Enter Project Title"
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
                      <label>Start Date</label>
                      <div class="form-group">
                        <input
                          type="date"
                          class="form-control"
                          v-model="form.start_date"
                        />
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <label>End Date</label>
                      <div class="form-group">
                        <input
                          type="date"
                          class="form-control"
                          v-model="form.end_date"
                        />
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="title">Website URL</label>
                        <input
                          type="text"
                          v-model="form.website_url"
                          class="form-control"
                          placeholder="Enter URL"
                        />
                      </div>
                    </div>

                    <div class="col-sm-12">
                      <div
                        v-if="thumbnail"
                        class="image-input"
                        :style="`background-image: url(${thumbnail})`"
                        @click="chooseImage"
                      >
                        <input
                          class="file-input"
                          ref="fileInput"
                          type="file"
                          @input="onSelectFile"
                        />
                      </div>
                      <div
                        v-else
                        class="image-input"
                        :style="`background-image: url(${form.project_thumbnail})`"
                        @click="chooseImage"
                      >
                        <!-- <span v-if="!!form.image" class="placeholder">Choose an Image</span> -->
                        <input
                          class="file-input"
                          ref="fileInput"
                          type="file"
                          @input="onSelectFile"
                        />
                      </div>
                    </div>
                    <!-- <div class="col-sm-3">
                      <div class="form-group">
                        <label>Project Image</label>
                        <div class="custom-file">
                          <input
                            type="file" class="custom-file-input" id="customFile" v-model="form.project_image"
                          />
                          <label class="custom-file-label" for="customFile"
                            >Choose file</label
                          >
                        </div>
                      </div>
                    </div> -->
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
      thumbnail: null,
    };
  },
  //   computed: {
  //     hasFile: function () {
  //       console.log(this.form?.image, "rom has file");
  //       return !!this.thumbnail;
  //     },
  //   },

  mounted() {
    this.getProject();
  },

  created() {
    this.$store.dispatch("getProjectsCategories");
  },

  computed: {
    ProjectsCategories() {
      return this.$store.getters.PROJECTSCATEGOROES;
    },
  },

  methods: {
    async getProject() {
      // let instance = this;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      await axios
        .get(`http://127.0.0.1:8000/api/project/show/${this.id}`)
        .then((response) => {
          this.form = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    updateProject() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      var formData = new FormData();
      formData.append("category_id", this.form.category_id);
      formData.append("project_title", this.form.project_title);
      formData.append("description", this.form.description);
      formData.append("start_date", this.form.start_date);
      formData.append("end_date", this.form.end_date);
      formData.append("website_url", this.form.website_url);

      formData.append("project_thumbnail", this.form.project_thumbnail);

      let instance = this;
      axios
        .post(`http://127.0.0.1:8000/api/project/update/${this.id}`, formData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then(function () {
          Swal.fire({
            icon: "success",
            title: "Project Infromation Updated Successfully",
          });
          instance.$router.push("/admin/projects");
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
      const files = input.files;
      this.form.project_thumbnail = files[0];
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
  width: 200px;
  height: 200px;
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
