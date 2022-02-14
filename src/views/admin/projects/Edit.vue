<template>
  <div>
    <breadcrumb title="Edit Team Member" />

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-dark">
              <div class="card-header">
                <h3 class="card-title">Team Member Update Form</h3>
                <router-link
                  :to="{ name: 'teams' }"
                  class="btn btn-primary btn-sm text-light"
                  style="float: right"
                  >Back</router-link
                >
              </div>

              <form
                @submit.prevent="updateMember()"
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
                          placeholder="Enter Name"
                        />
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="sub_title">Designation</label>
                        <input
                          type="text"
                          v-model="form.designation"
                          class="form-control"
                          placeholder="Enter Designation"
                        />
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="form-group">
                        <label for="sub_title">Facebook URL</label>
                        <input
                          type="text"
                          v-model="form.fb_url"
                          class="form-control"
                          placeholder="Enter URL"
                        />
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="form-group">
                        <label for="sub_title">Twitter URL</label>
                        <input
                          type="text"
                          v-model="form.twitter_url"
                          class="form-control"
                          placeholder="Enter URL"
                        />
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="form-group">
                        <label for="sub_title">Linkedin URL</label>
                        <input
                          type="text"
                          v-model="form.linkedin_url"
                          class="form-control"
                          placeholder="Enter URL"
                        />
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div class="form-group">
                        <label for="sub_title">Instagram URL</label>
                        <input
                          type="text"
                          v-model="form.insta_url"
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
                        :style="`background-image: url(${form.image})`"
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
    this.getTeam();
  },

  methods: {
    async getTeam() {
      // let instance = this;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      await axios
        .get(`http://127.0.0.1:8000/api/team/show/${this.id}`)
        .then((response) => {
          this.form = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    updateMember() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      var formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("designation", this.form.designation);
      formData.append("fb_url", this.form.fb_url);
      formData.append("twitter_url", this.form.twitter_url);
      formData.append("linkedin_url", this.form.linkedin_url);
      formData.append("insta_url", this.form.insta_url);
      formData.append("image", this.form.image);

      let instance = this;
      axios
        .post(`http://127.0.0.1:8000/api/team/update/${this.id}`, formData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then(function () {
          Swal.fire({
            icon: "success",
            title: "Team Member Infromation Updated Successfully",
          });
          instance.$router.push("/admin/teams");
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
      this.form.image = files[0];
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
