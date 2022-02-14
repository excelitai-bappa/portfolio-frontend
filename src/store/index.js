import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('accessToken') || null,
    sliders: [],
    services: [],
    skills: [],
    faqs: [],
    teams: [],
    categories: [],
    testimonials: [],
    blog_categories: [],
  },

  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    SLIDERS: (state) => {
      return state.sliders
    },
    SERVICES: (state) => {
      return state.services
    },
    SKILLS: (state) => {
      return state.skills
    },
    FAQS: (state) => {
      return state.faqs
    },
    TEAMS: (state) => {
      return state.teams
    },
    CATEGORIES: (state) => {
      return state.categories
    },
    TESTIMONIALS: (state) => {
      return state.testimonials
    },
    BLOGCATEGORIES: (state) => {
      return state.blog_categories
    },
  },

  mutations: {
    setToken(state, token) {
      state.token = token
    },
    removeToken(state) {
      state.token = null
    },
    sliders(state, sliders) {
      state.sliders = sliders
    },
    services(state, service) {
      state.services = service
    },
    skills(state, skills) {
      state.skills = skills
    },
    faqs(state, faqs) {
      state.faqs = faqs
    },
    teams(state, teams) {
      state.teams = teams
    },
    categories(state, categories) {
      state.categories = categories
    },
    testimonials(state, testimonials) {
      state.testimonials = testimonials
    },
    blog_categories(state, blog_categories) {
      state.blog_categories = blog_categories
    },
  },

  actions: {
    removeToken(context) {
      context.commit('removeToken')
    },

    getSliders: async (context) => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('accessToken')
      await axios
        .get('http://127.0.0.1:8000/api/sliders')
        .then((response) => {
          context.commit('sliders', response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getServices: async (context) => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('accessToken')
      await axios
        .get('http://127.0.0.1:8000/api/services')
        .then((response) => {
          context.commit('services', response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getSkills: async (context) => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('accessToken')
      await axios
        .get('http://127.0.0.1:8000/api/skills')
        .then((response) => {
          context.commit('skills', response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getFaqs: async (context) => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('accessToken')
      await axios
        .get('http://127.0.0.1:8000/api/faqs')
        .then((response) => {
          context.commit('faqs', response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getTeams: async (context) => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('accessToken')
      await axios
        .get('http://127.0.0.1:8000/api/teams')
        .then((response) => {
          context.commit('teams', response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getCategories: async (context) => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('accessToken')
      await axios
        .get('http://127.0.0.1:8000/api/categories')
        .then((response) => {
          context.commit('categories', response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getTestimonials: async (context) => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('accessToken')
      await axios
        .get('http://127.0.0.1:8000/api/testimonials')
        .then((response) => {
          console.log(response.data.data)
          context.commit('testimonials', response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getBlogCategories: async (context) => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('accessToken')
      await axios
        .get('http://127.0.0.1:8000/api/blog-categories')
        .then((response) => {
          context.commit('blog_categories', response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    login(context, form) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:8000/api/user/login', {
            email: form.email,
            password: form.password,
          })
          .then((response) => {
            localStorage.setItem('accessToken', response.data.token)
            context.commit('setToken', response.data.token)
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    logout(context) {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + context.state.token

      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:8000/api/user/logout')
          .then((response) => {
            localStorage.removeItem('accessToken')
            context.commit('removeToken')
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
})
export default store
