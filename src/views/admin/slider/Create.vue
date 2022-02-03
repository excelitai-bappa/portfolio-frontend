<template>
  <div>
      <breadcrumb title="Create Slider"/>
      <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card card-dark">
                        <div class="card-header">
                            <h3 class="card-title">Slider Create Form</h3>
                            <router-link :to="{name: 'sliders'}" class="btn btn-primary btn-sm text-light" style="float:right">Back</router-link>

                        </div>
                        <form @submit.prevent="addSlider()" enctype="multipart/form-data">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label for="title">Title</label>
                                            <input type="text" v-model="form.title" class="form-control" placeholder="Enter Title">
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                         <div class="form-group">
                                            <label for="sub_title">Sub Title</label>
                                            <input type="text" v-model="form.sub_title" class="form-control" placeholder="Enter Sub Title">
                                        </div>
                                    </div>
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label>Short Description</label>
                                            <textarea class="form-control" rows="3" placeholder="Enter Here..." v-model="form.short_description"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-sm-12">
                                        <div class="image-input" :style="{ backgroundImage: `url(${thumbnail})` }" @click="chooseImage">
                                            <span v-if="!form.image" class="placeholder">Choose an Image</span>
                                            <input class="file-input" ref="fileInput" type="file" @input="onSelectFile">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.card-body -->

                            <div class="card-footer">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
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
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
            var formData = new FormData();
            formData.append('title',this.form.title);
            formData.append('sub_title',this.form.sub_title);
            formData.append('short_description',this.form.short_description);
            formData.append('image',this.form.image);

            let instance = this;
            axios.post('http://127.0.0.1:8000/api/slider/create', formData).then(function (response) {
                console.log(response);
                Swal.fire({
                    icon: "success",
                    title: "Slider Created Successfully",
                });
                instance.$router.push("/admin/sliders");
            }).catch(function (error) {
                console.log(error);
            });
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
<style scoped>
.image-input{
    display: block;
    width: 600px;
    height: 300px;
    background-size: cover;
    background-position: center center;
}
.placeholder{
    background: #F0F0F0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    cursor: pointer;
    font-size: 18px;
    font-family: Helvetica;
    border: 1px solid;
}
.placeholder:hover{
    background: #E0E0E0
}
.file-input{
    display: none;
}
</style>
