<template>
    <div>
        <breadcrumb title="Create Slider"/>
        <section class="content">
            <div class="container-fluid">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">All Sliders</h3>
                        <router-link :to="{name: 'slider-create'}" class="btn btn-primary btn-sm" style="float:right">Create Slider</router-link>
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Trident</td>
                                    <td>Trident</td>
                                    <td>Trident</td>
                                    <td>Trident</td>
                                    <td>Trident</td>
                                    <td>Trident</td>
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
import Breadcrumb from "../../../components/admin/Breadcrumb.vue"
import Swal from 'sweetalert2'
import axios from "axios"

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
                    }).catch((error) => {
                        console.log(error)
                    });
                }
            });
        },
    },
}

</script>
