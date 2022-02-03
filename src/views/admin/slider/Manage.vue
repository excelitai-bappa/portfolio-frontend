<template>
  <div>
      <breadcrumb title="Manage Member"/>

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">

            <!-- <router-link :to="{name: 'member-create'}">Create Member</router-link> -->

            <div class="card">
              <div class="card-header">
                <h3 class="card-title">All Sliders</h3>
                <router-link :to="{name: 'member-create'}" class="btn btn-primary btn-sm" style="float:right">Create Member</router-link>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <table id="example1" class="table table-bordered table-striped">
                  <thead>
                  <tr>
                    <th>Rendering engine</th>
                    <th>Browser</th>
                    <th>Platform(s)</th>
                    <th>Engine version</th>
                    <th>CSS grade</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Trident</td>
                      <td>Internet
                        Explorer 4.0
                      </td>
                      <td>Win 95+</td>
                      <td> 4</td>
                      <td>X</td>
                    </tr>
         
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
              <!-- /.card-header -->
              <!-- <div class="card-body">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th style="width: 10px">#</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>ID</th>
                      <th>Contact</th>
                      <th>Card No</th>
                      <th>Start Date</th>
                      <th>Created By</th>
                      <th>Status</th>
                      <th style="width: 40px"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(info, key) in getMembers" :key="key">
                      <td>1.</td>
                      <td>
                          <img :src="info.profile_picture" alt="" style="height:60px; width:60px">
                      </td>


                      <td>{{info.name}}</td>
                      <td>{{info.member_id}}</td>
                      <td>{{info.mobile}}</td>
                      <td>{{info.card_no}}</td>
                      <td>{{info.start_date}}</td>
                      <td>{{info.user.name}}</td>
                      <td><span class="badge" :class="statusColor(info.status)">{{info.status}}</span></td>
                      <td>
                        <div class="dropdown">
                        <a class="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" style="border: 1px solid">
                          Action
                        </a>

                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                          <li><a class="dropdown-item" href="#">View</a></li>
                          <li>
                            <router-link :to="{name: 'member-edit', params:{id: info.id}}" class="dropdown-item" >Edit</router-link>
                          </li>
                          <li><a class="dropdown-item" href="#">Active</a></li>
                          <li><a class="dropdown-item" href="#">Deactive</a></li>
                          <div class="dropdown-divider"></div>
                          <li>
                            <a class="dropdown-item bg-danger" style="cursor:pointer" @click="removeMember(info.id)">Delete</a>
                          </li>
                          
                        </ul>
                      </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="card-footer clearfix">
                <ul class="pagination pagination-sm m-0 float-right">
                  <li class="page-item"><a class="page-link" href="#">&laquo;</a></li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item"><a class="page-link" href="#">&raquo;</a></li>
                </ul>
              </div> -->
            <!-- /.card -->
        </div>
      </section>
      <!-- /.content -->
  </div>
</template>

<script>
import Breadcrumb from "../../../components/admin/Breadcrumb.vue"
import axios from "axios"
import Swal from 'sweetalert2'

export default {
    name: "Manage",
    components: {Breadcrumb},
    data(){
      return{
          color:{
              'Inactive': "bg-danger",
              'Active': "bg-success",
          },
          members:[]
      }
    },

    mounted(){
      this.$store.dispatch("getMembers");
    },
    
    computed: {
      getMembers() {
        return this.$store.getters.members;
      },
    },

    methods: {
      imageLink: function(name){
        return 'http://127.0.0.1:8000/upload/users_images/'+ name
      },
      statusColor(status) {
         return this.color[status];
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
          axios.delete('http://127.0.0.1:8000/api/members/' + id).then( () =>{
      
              // Toast.fire({
              //   icon: "success",
              //   title: "Category Deleted Successfully",
              // });
              Swal.fire("Deleted!", "Member Deleted Successfully", "success");
              this.$store.dispatch("getMembers");
            })
            .catch((error) => {
              console.log(error)
            });
        }
      });
    },


    },
}

</script>
<style scoped>

</style>
