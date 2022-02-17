import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('accessToken') || null,
    user_information: [],
    sliders: [],
    services: [],
    skills: [],
    faqs: [],
    teams: [],
    active_latest_members: [],
    projects: [],
    categories: [],
    project_categories: [],
    testimonials: [],
    blog_categories: [],
    blog_active_categories: [],
    blogs: [],
    contacts: [],
  },

  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    PROFILE: (state) => {
      return state.user_information
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
    ACTIVE_LATEST_MEMBERS: (state) => {
      return state.active_latest_members
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
    PROJECTS: (state) => {
      return state.projects
    },
    PROJECTSCATEGOROES: (state) => {
      return state.project_categories
    },
    BLOGSCATEGOROES: (state) => {
      return state.blog_active_categories
    },
    BLOGS: (state) => {
      return state.blogs
    },
    CONTACTS: (state) => {
      return state.contacts
    },
  },

  mutations: {
    setToken(state, token) {
      state.token = token
    },
    removeToken(state) {
      state.token = null
    },
    user_information(state, user_information) {
      state.user_information = user_information
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
    active_latest_members(state, active_latest_members) {
      state.active_latest_members = active_latest_members
    },
    categories(state, categories) {
      state.categories = categories
    },
    project_categories(state, project_categories) {
      state.project_categories = project_categories
    },
    projects(state, projects) {
      state.projects = projects
    },
    testimonials(state, testimonials) {
      state.testimonials = testimonials
    },
    blog_categories(state, blog_categories) {
      state.blog_categories = blog_categories
    },
    blog_active_categories(state, blog_active_categories) {
      state.blog_active_categories = blog_active_categories
    },
    blogs(state, blogs) {
      state.blogs = blogs
    },
    contacts(state, contacts) {
      state.contacts = contacts
    },
  },

  actions: {
    removeToken(context) {
      context.commit('removeToken')
    },
    // loggedInInformation: async (context) => {
    //   axios.defaults.headers.common['Authorization'] =
    //     'Bearer ' + localStorage.getItem('accessToken')
    //   await axios
    //     .get('http://127.0.0.1:8000/api/user/profile')
    //     .then((response) => {
    //       console.log(response)
    //       context.commit('logged_in_information', response.data.data)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // },

    getUserProfileInfo: async (context) => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('accessToken')
      await axios
        .get('http://127.0.0.1:8000/api/user/profile')
        .then((response) => {
          console.log(response.data.data)
          context.commit('user_information', response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
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
    getActiveLatestMembers: async (context) => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('accessToken')
      await axios
        .get('http://127.0.0.1:8000/api/teams/active-latest-members')
        .then((response) => {
          context.commit('active_latest_members', response.data.data)
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
    getProjectsCategories: async (context) => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('accessToken')
      await axios
        .get('http://127.0.0.1:8000/api/active-project-category')
        .then((response) => {
          context.commit('project_categories', response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getProjects: async (context) => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('accessToken')
      await axios
        .get('http://127.0.0.1:8000/api/projects')
        .then((response) => {
          context.commit('projects', response.data.data)
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
    getActiveBlogsCategories: async (context) => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('accessToken')
      await axios
        .get('http://127.0.0.1:8000/api/active-blog-categories')
        .then((response) => {
          context.commit('blog_active_categories', response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    getAllBlogs: async (context) => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('accessToken')
      await axios
        .get('http://127.0.0.1:8000/api/blogs')
        .then((response) => {
          context.commit('blogs', response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getContacts: async (context) => {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('accessToken')
      await axios
        .get('http://127.0.0.1:8000/api/contacts')
        .then((response) => {
          context.commit('contacts', response.data.data)
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
