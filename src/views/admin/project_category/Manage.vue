<template>
  <div>
    <breadcrumb title="Project Categories" />
    <section class="content">
      <div class="container-fluid">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">All Project Categories</h3>
            <router-link
              :to="{ name: 'project-category-create' }"
              class="btn btn-primary btn-sm"
              style="float: right"
              >Create Service</router-link
            >
          </div>
          <div class="card-body">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Category Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(info, key) in getCategories" :key="key">
                  <td style="vertical-align: middle">{{ ++key }}</td>
                  <td style="vertical-align: middle">{{ info.name }}</td>
                  <td style="vertical-align: middle">
                    <span class="badge" :class="statusColor(info.status)">{{
                      info.status
                    }}</span>
                  </td>
                  <td style="vertical-align: middle">
                    <div class="dropdown">
                      <a
                        class="btn dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-expanded="false"
                        style="border: 1px solid"
                      >
                        Action
                      </a>

                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <li><a class="dropdown-item" href="#">View</a></li>
                        <li>
                          <router-link
                            :to="{
                              name: 'project-category-edit',
                              params: { id: info.id },
                            }"
                            class="dropdown-item"
                            >Edit</router-link
                          >
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                            type="button"
                            @click="changeStatus(info.id)"
                            >Status Change</a
                          >
                        </li>
                        <div class="dropdown-divider"></div>
                        <li>
                          <a
                            class="dropdown-item bg-danger"
                            style="cursor: pointer"
                            @click="removeCategory(info.id)"
                            >Delete</a
                          >
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
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
  name: "Manage",
  components: { Breadcrumb },
  data() {
    return {
      color: {
        Inactive: "bg-danger",
        Active: "bg-success",
      },
      members: [],
    };
  },

  created() {
    this.$store.dispatch("getCategories");
  },

  computed: {
    getCategories() {
      return this.$store.getters.CATEGORIES;
    },
  },

  methods: {
    statusColor(status) {
      return this.color[status];
    },
    changeStatus(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Change it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("http://127.0.0.1:8000/api/category/status-change/" + id)
            .then(() => {
              // Toast.fire({
              //   icon: "success",
              //   title: "Category Deleted Successfully",
              // });
              Swal.fire("Updated!", "Status Update Successfully", "success");
              this.$store.dispatch("getCategories");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    removeCategory(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("http://127.0.0.1:8000/api/category/delete/" + id)
            .then(() => {
              // Toast.fire({
              //   icon: "success",
              //   title: "Category Deleted Successfully",
              // });
              Swal.fire("Deleted!", "Category Deleted Successfully", "success");
              this.$store.dispatch("getCategories");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
  },
};
</script>
