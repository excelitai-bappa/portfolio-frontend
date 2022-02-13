<template>
  <div>
    <breadcrumb title="Create FAQ" />
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-dark">
              <div class="card-header">
                <h3 class="card-title">FAQ Create Form</h3>
                <router-link
                  :to="{ name: 'faqs' }"
                  class="btn btn-primary btn-sm text-light"
                  style="float: right"
                  >Back</router-link
                >
              </div>
              <form @submit.prevent="addFaq()">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="title">Question</label>
                        <input
                          type="text"
                          v-model="form.question"
                          class="form-control"
                          placeholder="Enter FAQ Question"
                        />
                      </div>
                    </div>
                    <div class="col-sm-6">
                      <div class="form-group">
                        <label for="sub_title">Answer</label>
                        <input
                          type="text"
                          v-model="form.answer"
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
        question: null,
        answer: null,
      },
    };
  },

  methods: {
    addFaq() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      var formData = new FormData();
      formData.append("question", this.form.question);
      formData.append("answer", this.form.answer);

      let instance = this;
      axios
        .post("http://127.0.0.1:8000/api/faq/create", formData)
        .then(function (response) {
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "FAQ Created Successfully",
          });
          instance.$router.push("/admin/faqs");
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
