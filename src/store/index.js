import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('accessToken') || null,
    members: [],
  },

  getters: {
    loggedIn(state){
      return state.token !== null
    },
    members: (state) => {
      return state.members;
    },
  },

  mutations: {
    setToken(state, token){
      state.token = token
    },
    removeToken(state){
      state.token = null
    },
    members(state, members){
      state.members = members;
    },
  },
  
  actions: {
    removeToken(context) {
      context.commit('removeToken')
    },

    getMembers: async (context)=>{
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accessToken')
      await axios.get('http://127.0.0.1:8000/api/members').then( response =>{
        console.log(response.data)
        context.commit("members", response.data.data);
      }).catch((error) => {
        console.log(error)
      });
    },

    
    
    login(context, form){
      return new Promise((resolve, reject)=>{
        axios.post('http://127.0.0.1:8000/api/user/login', {
        email: form.email,
        password: form.password,
          }).then(response=>{
            localStorage.setItem('accessToken', response.data.token)
            context.commit('setToken', response.data.token)
            resolve(response)
          }).catch(error =>{
            reject(error)
          })
      })
    },
    
    logout(context){
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
   
      return new Promise((resolve, reject) => {
          axios.post('http://127.0.0.1:8000/api/user/logout').then( response =>{
            localStorage.removeItem('accessToken')
            context.commit('removeToken')
            resolve(response)
          }).catch(error =>{
            reject(error)
          })
        })
      },
    
    
  }
})
export default store