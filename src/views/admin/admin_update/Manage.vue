<template>
  <div>
    <breadcrumb title="Admin" />

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-dark">
              <div class="card-header">
                <h3 class="card-title">Admin Update Form</h3>
              </div>
              <form @submit.prevent="updateAdmin()">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-8">
                      <div class="form-group row">
                        <label for="inputName" class="col-sm-2 col-form-label"
                          >Name</label
                        >
                        <div class="col-sm-10">
                          <input
                            type="text"
                            class="form-control"
                            id="inputName"
                            v-model="form.name"
                            placeholder="Enter Name"
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label"
                          >Email</label
                        >
                        <div class="col-sm-10">
                          <input
                            type="email"
                            class="form-control"
                            id="inputEmail"
                            v-model="form.email"
                            placeholder="Enter Email"
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputName2" class="col-sm-2 col-form-label"
                          >Number</label
                        >
                        <div class="col-sm-10">
                          <input
                            type="text"
                            class="form-control"
                            id="inputName2"
                            v-model="form.phone"
                            placeholder="Contact Number"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4">
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
                        :style="`background-image: url(${form.profile_picture})`"
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
                      <div class="bg-primary" style="padding: 10px 0px">
                        <h5
                          class="text-white text-center"
                          style="margin-bottom: 0px; vertical-allign: middle"
                        >
                          PROFILE PICTURE
                        </h5>
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
      thumbnail: null,
    };
  },

  mounted() {
    this.getUserInformation();
  },

  methods: {
    async getUserInformation() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      await axios
        .get("http://127.0.0.1:8000/api/user/profile")
        .then((response) => {
          this.form = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    updateAdmin() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      var formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("email", this.form.email);
      formData.append("profile_picture", this.form.profile_picture);
      formData.append("phone", this.form.phone);

      let instance = this;
      axios
        .post(
          `http://127.0.0.1:8000/api/user/profile/update/${this.form.id}`,
          formData,
          {
            headers: { "content-type": "multipart/form-data" },
          }
        )
        .then(function () {
          Swal.fire({
            icon: "success",
            title: "Admin Profile Updated Successfully",
          });
          instance.$router.push("/admin/profile/update");
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
      this.form.profile_picture = files[0];
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
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center center;
  border: 1px solid grey;
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
