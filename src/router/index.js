import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/website/Index"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("../views/website/Home.vue"),
      },
      {
        path: "/about",
        name: "About",
        component: () => import("../views/website/About.vue"),
      },
    ],
  },

  {
    path: "/",
    component: () => import("../views/admin/Index"),
    children: [
      {
        path: "/admin/dashboard",
        name: "admin-dashboard",
        component: () => import("../views/admin/Dashboard"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/admin/sliders",
        name: "sliders",
        component: () => import("../views/admin/slider/Manage"),

        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/admin/slider/create",
        name: "slider-create",
        component: () => import("../views/admin/slider/Create"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/admin/login",
    name: "admin-login",
    component: () => import("../views/admin/Login"),
    meta: {
      visitor: true,
    },
  },
  {
    path: "/admin/logout",
    name: "admin-logout",
    component: () => import("../components/admin/Logout"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    if (!store.getters.loggedIn) {
      next( {name: 'admin-login'} )
    } else {
      next()
    }
  }else if (to.matched. some(record => record.meta.visitor)) {
    if (store.getters.loggedIn) {
        next( {name: 'admin-dashboard'} )
      } else {
        next()
      }
  }else{
    next()
  }
})



export default router;
