<template>
    <div class="hold-transition login-page">
        <div class="login-box">
            <div class="login-logo">
                <b>GYM</b> SYSTEM
            </div>
            
            <div class="card">
                <div class="card-body login-card-body">
                <p class="login-box-msg">Sign in to start your session</p>

                <form @submit.prevent="login">
                    <div class="form-group mb-3">
                        <div class="input-group">
                            <input type="email" class="form-control" placeholder="Email" v-model="form.email">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <span class="text-danger" v-if="errors.length">{{ errors.email }}</span>
                        <span class="text-danger" v-if="incorrect_data_error.length">{{ incorrect_data_error }}</span> 
                        <span class="text-danger" v-if="active_error.length">{{ active_error }}</span>
                    </div>
                    
                    <div class="form-group mb-3">
                        <div class="input-group">
                            <input type="password" class="form-control" placeholder="Password" v-model="form.password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <span class="text-danger" v-if="errors.length">{{ errors.password[0] }}</span>
                    </div>
                    <div class="row">
                        <div class="col-8">
                            <div class="icheck-primary">
                            <input type="checkbox" id="remember">
                            <label for="remember">
                                Remember Me
                            </label>
                        </div>
                    </div>
                    
                    <div class="col-4">
                        <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                    </div>
                
                    </div>
                </form>

                <div class="social-auth-links text-center mb-3">
                    <p>- OR -</p>
                    <a href="#" class="btn btn-block btn-primary">
                    <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
                    </a>
                    <a href="#" class="btn btn-block btn-danger">
                    <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
                    </a>
                </div>

                <p class="mb-1">
                    <a href="forgot-password.html">I forgot my password</a>
                </p>
                <p class="mb-0">
                    <a href="register.html" class="text-center">Register a new membership</a>
                </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import axios from 'axios'


export default {
    name: "Login",
    data: () => ({
        form:{
            email: null,
            password: null
        },
        errors: [],
        active_error: [],
        incorrect_data_error: [],
    }),

    methods: {
        login(){
            this.$store.dispatch('login', this.form).then( () => {
                this.$router.push({
                    name:'admin-dashboard'
                })
            })
        }
    },
   
}

</script>
<style scoped>

</style>


