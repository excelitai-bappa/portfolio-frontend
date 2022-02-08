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
                <h3 class="card-title">Slider Update Form</h3>
                <router-link
                  :to="{ name: 'sliders' }"
                  class="btn btn-primary btn-sm text-light"
                  style="float: right"
                  >Back</router-link
                >
              </div>

              <form
                @submit.prevent="updateSlider()"
                enctype="multipart/form-data"
              >
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-6">
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
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="sub_title">Sub Title</label>
                        <input
                          type="text"
                          v-model="form.sub_title"
                          class="form-control"
                          placeholder="Enter Sub Title"
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
                    <!-- <div class="col-sm-12">
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
                    </div> -->

                    <div class="col-sm-12">
                        <div v-if="thumbnail" class="image-input" :style="`background-image: url(${thumbnail})`" @click="chooseImage">
                            <input class="file-input" ref="fileInput" type="file" @input="onSelectFile">
                        </div>
                        <div v-else class="image-input" :style="`background-image: url(${form.image})`" @click="chooseImage">
                            <span v-if="!!form.image" class="placeholder">Choose an Image</span>
                            <input class="file-input" ref="fileInput" type="file" @input="onSelectFile">
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
    this.getSlider();
  },

  methods: {
    async getSlider() {
      // let instance = this;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      await axios
        .get(`http://127.0.0.1:8000/api/slider/show/${this.id}`)
        .then((response) => {
          console.log(response.data.data);
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
      formData.append("gender", this.form.gender);
      formData.append("mobile", this.form.mobile);
      formData.append("blood_group", this.form.blood_group);
      formData.append("address", this.form.address);
      formData.append("profile_picture", this.form.profile_picture);
      formData.append("card_no", this.form.card_no);

      let instance = this;
      axios
        .post(`http://127.0.0.1:8000/api/members/${this.id}/update`, formData)
        .then(function (response) {
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "Member Updated Successfully",
          });
          instance.$router.push("/admin/members");
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
      this.form.profile_picture = files[0];
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.thumnail = e.target.result;
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
