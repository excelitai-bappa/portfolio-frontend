<template>
  <div class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
      <!-- Navbar -->
      <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"
              ><i class="fas fa-bars"></i
            ></a>
          </li>
          <li class="nav-item d-none d-sm-inline-block">
            <a href="index3.html" class="nav-link">Home</a>
          </li>
          <li class="nav-item d-none d-sm-inline-block">
            <a href="#" class="nav-link">Contact</a>
          </li>
        </ul>

        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" role="button">
              <i class="fas fa-sign-out-alt"></i>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.navbar -->

      <!-- Main Sidebar Container -->
      <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <router-link :to="{ name: 'admin-dashboard' }" class="brand-link">
          <img
            src="../../assets/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            class="brand-image img-circle elevation-3"
            style="opacity: 0.8"
          />
          <span class="brand-text font-weight-light">Portfolio</span>
        </router-link>

        <!-- Sidebar -->
        <div class="sidebar">
          <!-- Sidebar user panel (optional) -->
          <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
              <img
                v-if="data.profile_picture"
                :src="data.profile_picture"
                class="img-circle elevation-2"
                alt="User Image"
                style="height: 40px; width: 40px"
              />
              <img
                v-else
                src="https://spng.pngfind.com/pngs/s/5-52097_avatar-png-pic-vector-avatar-icon-png-transparent.png"
                class="img-circle elevation-2"
                alt="User Image"
                style="height: 40px; width: 40px"
              />
            </div>
            <div class="info">
              <router-link
                :to="{ name: 'admin-profile-update' }"
                class="d-block"
              >
                {{ data.name }}
              </router-link>
            </div>
          </div>

          <!-- SidebarSearch Form -->
          <div class="form-inline">
            <div class="input-group" data-widget="sidebar-search">
              <input
                class="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div class="input-group-append">
                <button class="btn btn-sidebar">
                  <i class="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Sidebar Menu -->
          <nav class="mt-2">
            <ul
              class="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <!-- Add icons to the links using the .nav-icon class
                with font-awesome or any other icon font library -->
              <li class="nav-item">
                <router-link :to="{ name: 'admin-dashboard' }" class="nav-link">
                  <i class="nav-icon fas fa-home"></i>
                  <p>
                    Dashboard
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link :to="{ name: 'sliders' }" class="nav-link">
                  <i class="nav-icon far fa-image"></i>
                  <p>
                    Sliders
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'services' }" class="nav-link">
                  <i class="nav-icon fa fa-briefcase"></i>
                  <p>
                    Services
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'about-us' }" class="nav-link">
                  <i class="nav-icon fa fa-edit"></i>
                  <p>
                    About Us
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'skills' }" class="nav-link">
                  <!-- <i class="nav-icon fas fa-th"></i> -->
                  <i class="nav-icon fas fa-chart-line"></i>
                  <p>
                    Skills
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'faqs' }" class="nav-link">
                  <i class="nav-icon far fa-plus-square"></i>
                  <p>
                    FAQS
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'teams' }" class="nav-link">
                  <!-- <i class="nav-icon fa fa-users"></i> -->
                  <i class="nav-icon fa fa-users"></i>
                  <p>
                    Teams
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ name: 'project_categories' }"
                  class="nav-link"
                >
                  <i class="nav-icon fas fa-tag"></i>
                  <p>
                    Project Category
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'projects' }" class="nav-link">
                  <i class="nav-icon fas fa-home"></i>
                  <p>
                    Projects
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'testimonials' }" class="nav-link">
                  <i class="nav-icon fas fa-clipboard-check"></i>
                  <p>
                    Testimonials
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'blog-categories' }" class="nav-link">
                  <i class="nav-icon fas fa-home"></i>
                  <p>
                    Blog Categories
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'blogs' }" class="nav-link">
                  <i class="nav-icon fas fa-landmark"></i>
                  <p>
                    Blogs
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'contacts' }" class="nav-link">
                  <i class="nav-icon far fa-envelope"></i>
                  <p>
                    Contacts
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'settings' }" class="nav-link">
                  <i class="nav-icon far fas fa-cog"></i>
                  <p>
                    Setting
                    <i class="right fas fa-angle-left"></i>
                  </p>
                </router-link>
              </li>

              <li class="nav-item">
                <a @click="logout" class="nav-link" style="cursor: pointer">
                  <i class="nav-icon fas fa-sign-out-alt"></i>
                  <p>Logout</p>
                </a>
              </li>
            </ul>
          </nav>
          <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
      </aside>

      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
        <router-view></router-view>
      </div>
      <!-- /.content-wrapper -->
      <footer class="main-footer">
        <strong
          >Copyright &copy; 2014-2021
          <a href="https://adminlte.io">AdminLTE.io</a>.</strong
        >
        All rights reserved.
        <div class="float-right d-none d-sm-inline-block">
          <b>Version</b> 3.1.0
        </div>
      </footer>

      <!-- Control Sidebar -->
      <aside class="control-sidebar control-sidebar-dark">
        <!-- Control sidebar content goes here -->
      </aside>
      <!-- /.control-sidebar -->
    </div>
  </div>
  <!-- ./wrapper -->
</template>

<script>
import axios from "axios";

export default {
  name: "Index",
  loggedIn() {
    return this.$store.$getters.loggedIn;
  },
  data() {
    return {
      data: {
        name: "",
        email: "",
        profile_picture: "",
      },
    };
  },

  computed: {
    getProjects() {
      return this.$store.getters.PROFILE;
    },
  },
  
  created() {
    this.getUserInformation()
  },

  methods: {
    async getUserInformation() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.$store.state.token;
      await axios
        .get("http://127.0.0.1:8000/api/user/profile")
        .then((response) => {
          this.data.name = response.data.data.name;
          this.data.email = response.data.data.email;
          this.data.profile_picture = response.data.data.profile_picture;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push({
          name: "admin-login",
        });
      });
    },
  },
};
</script>
<style scoped>
</style>
