<template>
  <div>
    <breadcrumb title="Testimonial" />
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-dark">
              <div class="card-header">
                <h3 class="card-title">Testimonial Create Form</h3>
                <router-link
                  :to="{ name: 'testimonials' }"
                  class="btn btn-primary btn-sm text-light"
                  style="float: right"
                  >Back</router-link
                >
              </div>
              <form @submit.prevent="addTestimonial()">
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
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label>Statement</label>
                        <textarea
                          class="form-control"
                          rows="3"
                          placeholder="Enter Here..."
                          v-model="form.statement"
                        ></textarea>
                      </div>
                    </div>
                    <div class="col-sm-12">
                      <div
                        class="image-input"
                        :style="{ backgroundImage: `url(${thumbnail})` }"
                        @click="chooseImage"
                      >
                        <span v-if="!form.image" class="placeholder"
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
        name: null,
        designation: null,
        statement: null,
      },
      thumbnail: null,
    };
  },

  methods: {
    addTestimonial() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      var formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("designation", this.form.designation);
      formData.append("statement", this.form.statement);
      formData.append("image", this.form.image);

      let instance = this;
      axios
        .post("http://127.0.0.1:8000/api/testimonial/create", formData)
        .then(function (response) {
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "Testimonial Created Successfully",
          });
          instance.$router.push("/admin/testimonials");
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
