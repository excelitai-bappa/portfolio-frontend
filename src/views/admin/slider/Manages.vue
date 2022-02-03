<template>
    <div>
        <breadcrumb title="Create Slider"/>
        <section class="content">
            <div class="container-fluid">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">All Sliders</h3>
                        <router-link :to="{name: 'member-create'}" class="btn btn-primary btn-sm" style="float:right">Create Member</router-link>
                    </div>
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
    name: "Create",
    components: {Breadcrumb},

    data(){
        return{
            form: {
                title: null,
                sub_title: null,
                short_description: null,
                image: null,
            },
            thumbnail:null
        }
    },

    methods: {

        addSlider() {
            // axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
            // var formData = new FormData();
            // formData.append('title',this.form.title);
            // formData.append('sub_title',this.form.sub_title);
            // formData.append('short_description',this.form.short_description);
            // formData.append('image',this.form.image);

            // let instance = this;
            // axios.post('http://127.0.0.1:8000/api/members', formData).then(function (response) {
            //     console.log(response);
            //     Swal.fire({
            //         icon: "success",
            //         title: "Member Created Successfully",
            //     });
            //     instance.$router.push("/admin/members");
            // }).catch(function (error) {
            //     console.log(error);
            // });
        },

        chooseImage () {
            this.$refs.fileInput.click()
        },

        onSelectFile (event) {
            const input = event.target;
            console.log(event)
            const files = input.files
            this.form.image = files[0];
            if (files && files[0]) {
                const reader = new FileReader
                reader.onload = e => {
                   this.thumbnail = e.target.result
                }
                reader.readAsDataURL(files[0])
                this.$emit('input', files[0])
            }
        }
    },

}

</script>
