<template>
  <div>
    <breadcrumb title="Edit FAQ" />

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card card-dark">
              <div class="card-header">
                <h3 class="card-title">FAQ Update Form</h3>
                <router-link
                  :to="{ name: 'faqs' }"
                  class="btn btn-primary btn-sm text-light"
                  style="float: right"
                  >Back</router-link
                >
              </div>

              <form @submit.prevent="updateFaq()">
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
      form: {
        question: null,
        answer: null,
      },
    };
  },

  mounted() {
    this.getFaq();
  },

  methods: {
    async getFaq() {
      // let instance = this;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      await axios
        .get(`http://127.0.0.1:8000/api/faq/show/${this.id}`)
        .then((response) => {
          this.form = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    updateFaq() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      var formData = new FormData();
      formData.append("question", this.form.question);
      formData.append("answer", this.form.answer);

      let instance = this;
      axios
        .post(`http://127.0.0.1:8000/api/faq/update/${this.id}`, formData)
        .then(function () {
          Swal.fire({
            icon: "success",
            title: "FAQ Updated Successfully",
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
