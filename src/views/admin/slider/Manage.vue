<template>
  <div>
    <breadcrumb title="Create Slider" />
    <section class="content">
      <div class="container-fluid">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">All Sliders</h3>
            <router-link
              :to="{ name: 'slider-create' }"
              class="btn btn-primary btn-sm"
              style="float: right"
              >Create Slider</router-link
            >
          </div>
          <div class="card-body">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Sub Title</th>
                  <th>Short Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(info, key) in getSliders" :key="key">
                  <td style="vertical-align: middle">{{ ++key }}</td>
                  <td style="vertical-align: middle">
                    <img
                      :src="info.image"
                      alt=""
                      style="height: 60px; width: 120px"
                    />
                  </td>

                  <td style="vertical-align: middle">{{ info.title }}</td>
                  <td style="vertical-align: middle">{{ info.sub_title }}</td>
                  <td style="vertical-align: middle">{{ info.short_description }}</td>
                  <!-- <td>
                    <span
                      class="badge"
                      :class="[
                        info.status == 'Inactive' ? 'bg-danger' : 'bg-success',
                      ]"
                      >{{ info.status }}</span
                    >
                  </td> -->
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
                              name: 'slider-edit',
                              params: { id: info.id },
                            }"
                            class="dropdown-item"
                            >Edit</router-link
                          >
                        </li>
                        <li><a class="dropdown-item" type="button" @click="changeStatus(info.id)">Status Change</a></li>
                        <div class="dropdown-divider"></div>
                        <li>
                          <a
                            class="dropdown-item bg-danger"
                            style="cursor: pointer"
                            @click="removeSlider(info.id)"
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
    this.$store.dispatch("getSliders");
  },

  computed: {
    getSliders() {
      return this.$store.getters.SLIDERS;
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
            .post("http://127.0.0.1:8000/api/slider/status-change/" + id)
            .then(() => {
              // Toast.fire({
              //   icon: "success",
              //   title: "Category Deleted Successfully",
              // });
              Swal.fire("Updated!", "Status Update Successfully", "success");
              this.$store.dispatch("getSliders");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },

    removeSlider(id) {
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
            .post("http://127.0.0.1:8000/api/slider/delete/" + id)
            .then(() => {
              // Toast.fire({
              //   icon: "success",
              //   title: "Category Deleted Successfully",
              // });
              Swal.fire("Deleted!", "Slider Deleted Successfully", "success");
              this.$store.dispatch("getSliders");
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
