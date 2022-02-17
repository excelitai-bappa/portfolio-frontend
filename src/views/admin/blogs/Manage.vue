<template>
  <div>
    <breadcrumb title="Blogs" />
    <section class="content">
      <div class="container-fluid">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">All Blogs</h3>
            <router-link
              :to="{ name: 'blog-create' }"
              class="btn btn-primary btn-sm"
              style="float: right"
              >Create Blog</router-link
            >
          </div>
          <div class="card-body">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Thumbnail</th>
                  <th>Category</th>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Description</th>
                  <th>Created By</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(info, key) in getBlogs" :key="key">
                  <td style="vertical-align: middle">{{ ++key }}</td>
                  <td style="vertical-align: middle">
                    <img
                      :src="info.blog_thumbnail"
                      alt=""
                      style="height: 60px; width: 60px"
                    />
                  </td>

                  <td style="vertical-align: middle">
                    {{ info.blog_category_id }}
                  </td>
                  <td style="vertical-align: middle">
                    {{ info.title }}
                  </td>
                  <td style="vertical-align: middle">{{ info.slug }}</td>
                  <td style="vertical-align: middle">{{ info.description }}</td>
                  <td style="vertical-align: middle">{{ info.created_by }}</td>
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
                              name: 'blog-edit',
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
                            @click="removeBlog(info.id)"
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
    };
  },

  created() {
    this.$store.dispatch("getAllBlogs");
  },

  computed: {
    getBlogs() {
      return this.$store.getters.BLOGS;
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
            .post("http://127.0.0.1:8000/api/blog/status-change/" + id)
            .then(() => {
              // Toast.fire({
              //   icon: "success",
              //   title: "Category Deleted Successfully",
              // });
              Swal.fire("Updated!", "Status Update Successfully", "success");
              this.$store.dispatch("getAllBlogs");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },

    removeBlog(id) {
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
            .post("http://127.0.0.1:8000/api/blog/delete/" + id)
            .then(() => {
              // Toast.fire({
              //   icon: "success",
              //   title: "Category Deleted Successfully",
              // });

              Swal.fire("Deleted!", "Blog Deleted Successfully", "success");
              this.$store.dispatch("getAllBlogs");
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
