<template>
  <div>
    <breadcrumb title="Dasahboard" />

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Info boxes -->
        <div class="row">
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box">
              <span class="info-box-icon bg-info elevation-1"
                ><i class="fas fa-cog"></i
              ></span>

              <div class="info-box-content">
                <span class="info-box-text">Total Slider</span>
                <span class="info-box-number"> 10 </span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-danger elevation-1"
                ><i class="fas fa-thumbs-up"></i
              ></span>

              <div class="info-box-content">
                <span class="info-box-text">Total Project Categories</span>
                <span class="info-box-number">41,410</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->

          <!-- fix for small devices only -->
          <div class="clearfix hidden-md-up"></div>

          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-success elevation-1"
                ><i class="fas fa-shopping-cart"></i
              ></span>

              <div class="info-box-content">
                <span class="info-box-text">Total Projects</span>
                <span class="info-box-number">760</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-warning elevation-1"
                ><i class="fas fa-users"></i
              ></span>

              <div class="info-box-content">
                <span class="info-box-text">Total Members</span>
                <span class="info-box-number">2,000</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
        </div>
        <div class="row">
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box">
              <span class="info-box-icon bg-info elevation-1"
                ><i class="fas fa-thumbs-up"></i
              ></span>

              <div class="info-box-content">
                <span class="info-box-text">Testimonial Statement</span>
                <span class="info-box-number">
                  10
                  <small>%</small>
                </span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-danger elevation-1"
                ><i class="fas fa-tag"></i
              ></span>

              <div class="info-box-content">
                <span class="info-box-text">Total Blog Categories</span>
                <span class="info-box-number">41,410</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->

          <!-- fix for small devices only -->
          <div class="clearfix hidden-md-up"></div>

          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-success elevation-1"
                ><i class="fas fa-landmark"></i
              ></span>

              <div class="info-box-content">
                <span class="info-box-text">Total Blogs</span>
                <span class="info-box-number">760</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-warning elevation-1"
                ><i class="far fa-envelope"></i
              ></span>

              <div class="info-box-content">
                <span class="info-box-text">Total Contact List</span>
                <span class="info-box-number">2,000</span>
              </div>
              <!-- /.info-box-content -->
            </div>
            <!-- /.info-box -->
          </div>
          <!-- /.col -->
        </div>

        <div class="row">
          <div class="col-md-12">
            <!-- USERS LIST -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Latest Members</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body p-0">
                <ul class="users-list clearfix">
                  <li v-for="(info, key) in getActiveLatestMembers" :key="key">
                    <img
                      :src="info.image"
                      alt="User Image"
                      style="
                        width: 150px;
                        height: 150px;
                        border: 1px solid grey;
                      "
                    />
                    <a class="users-list-name" href="#">{{ info.name }}</a>
                    <span class="users-list-date">Today</span>
                  </li>
                </ul>
                <!-- /.users-list -->
              </div>
              <!-- /.card-body -->
              <div class="card-footer text-center">
                <a href="javascript:">View All Users</a>
              </div>
              <!-- /.card-footer -->
            </div>
            <!--/.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import Breadcrumb from "../../components/admin/Breadcrumb.vue";
// import axios from "axios";
export default {
  name: "Dashboard",
  components: { Breadcrumb },

  mounted() {
    this.$store.dispatch("getActiveLatestMembers");
  },

  computed: {
    getActiveLatestMembers() {
      return this.$store.getters.ACTIVE_LATEST_MEMBERS;
    },
  },

  methods: {},
};
</script>
<style scoped>
.info-box {
  box-shadow: 0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 20%);
  border-radius: 0.25rem;
  background-color: #fff;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 1rem;
  min-height: 80px;
  padding: 0.5rem;
  position: relative;
  width: 100%;
}
</style>
