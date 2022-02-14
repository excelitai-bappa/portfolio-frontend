<template>
  <div>
    <breadcrumb title="Team Members" />
    <section class="content">
      <div class="container-fluid">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">All Team Members</h3>
            <router-link
              :to="{ name: 'team-create' }"
              class="btn btn-primary btn-sm"
              style="float: right"
              >Create Team Member</router-link
            >
          </div>
          <div class="card-body">
            <table id="example1" class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Facebook URL</th>
                  <th>Twitter URL</th>
                  <th>Linkedin URL</th>
                  <th>Instagram URL</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(info, key) in getTeams" :key="key">
                  <td style="vertical-align: middle">{{ ++key }}</td>
                  <td style="vertical-align: middle">
                    <img
                      :src="info.image"
                      alt=""
                      style="height: 60px; width: 60px"
                    />
                  </td>

                  <td style="vertical-align: middle">{{ info.name }}</td>
                  <td style="vertical-align: middle">{{ info.designation }}</td>
                  <td style="vertical-align: middle">{{ info.fb_url }}</td>
                  <td style="vertical-align: middle">{{ info.twitter_url }}</td>
                  <td style="vertical-align: middle">
                    {{ info.linkedin_url }}
                  </td>
                  <td style="vertical-align: middle">{{ info.insta_url }}</td>
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
                              name: 'team-edit',
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
                            @click="removeMember(info.id)"
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
    this.$store.dispatch("getTeams");
  },

  computed: {
    getTeams() {
      return this.$store.getters.TEAMS;
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
            .post("http://127.0.0.1:8000/api/team/status-change/" + id)
            .then(() => {
              // Toast.fire({
              //   icon: "success",
              //   title: "Category Deleted Successfully",
              // });
              Swal.fire("Updated!", "Status Update Successfully", "success");
              this.$store.dispatch("getTeams");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },

    removeMember(id) {
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
            .post("http://127.0.0.1:8000/api/team/delete/" + id)
            .then(() => {
              // Toast.fire({
              //   icon: "success",
              //   title: "Category Deleted Successfully",
              // });
              Swal.fire("Deleted!", "Member Deleted Successfully", "success");
              this.$store.dispatch("getTeams");
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
