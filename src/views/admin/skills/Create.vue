<template>
  <div>
    <breadcrumb title="Create Skill" />
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-dark">
              <div class="card-header">
                <h3 class="card-title">Skill Create Form</h3>
                <router-link
                  :to="{ name: 'skills' }"
                  class="btn btn-primary btn-sm text-light"
                  style="float: right"
                  >Back</router-link
                >
              </div>
              <form @submit.prevent="addSkill()">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="title">Skill Name</label>
                        <input
                          type="text"
                          v-model="form.skill_name"
                          class="form-control"
                          placeholder="Enter Skill Name"
                        />
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="sub_title">Skill Percentage</label>
                        <input
                          type="text"
                          v-model="form.skill_percentage"
                          class="form-control"
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
        skill_name: null,
        skill_percentage: null,
      },
    };
  },

  methods: {
    addSkill() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      var formData = new FormData();
      formData.append("skill_name", this.form.skill_name);
      formData.append("skill_percentage", this.form.skill_percentage);

      let instance = this;
      axios
        .post("http://127.0.0.1:8000/api/skill/create", formData)
        .then(function (response) {
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "Skill Created Successfully",
          });
          instance.$router.push("/admin/skills");
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
