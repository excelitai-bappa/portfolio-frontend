import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/website/Index'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/website/Home.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/website/About.vue'),
      },
    ],
  },

  {
    path: '/',
    component: () => import('../views/admin/Index'),
    children: [
      {
        path: '/admin/dashboard',
        name: 'admin-dashboard',
        component: () => import('../views/admin/Dashboard'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/sliders',
        name: 'sliders',
        component: () => import('../views/admin/slider/Manage'),

        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/slider-edit/:id',
        name: 'slider-edit',
        component: () => import('../views/admin/slider/Edit'),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/slider/create',
        name: 'slider-create',
        component: () => import('../views/admin/slider/Create'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/services',
        name: 'services',
        component: () => import('../views/admin/services/Manage'),

        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/service/create',
        name: 'service-create',
        component: () => import('../views/admin/services/Create'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/service-edit/:id',
        name: 'service-edit',
        component: () => import('../views/admin/services/Edit'),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/about-us',
        name: 'about-us',
        component: () => import('../views/admin/about-us/Edit'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/skills',
        name: 'skills',
        component: () => import('../views/admin/skills/Manage'),

        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/skill/create',
        name: 'skill-create',
        component: () => import('../views/admin/skills/Create'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/skill-edit/:id',
        name: 'skill-edit',
        component: () => import('../views/admin/skills/Edit'),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/faqs',
        name: 'faqs',
        component: () => import('../views/admin/faqs/Manage'),

        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/faq/create',
        name: 'faq-create',
        component: () => import('../views/admin/faqs/Create'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/faq-edit/:id',
        name: 'faq-edit',
        component: () => import('../views/admin/faqs/Edit'),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/teams',
        name: 'teams',
        component: () => import('../views/admin/teams/Manage'),

        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/team/create',
        name: 'team-create',
        component: () => import('../views/admin/teams/Create'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/team-edit/:id',
        name: 'team-edit',
        component: () => import('../views/admin/teams/Edit'),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/project_categories',
        name: 'project_categories',
        component: () => import('../views/admin/project_category/Manage'),

        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/project_category/create',
        name: 'project-category-create',
        component: () => import('../views/admin/project_category/Create'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/project-category-edit/:id',
        name: 'project-category-edit',
        component: () => import('../views/admin/project_category/Edit'),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/testimonials',
        name: 'testimonials',
        component: () => import('../views/admin/testimonials/Manage'),

        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/testimonial/create',
        name: 'testimonial-create',
        component: () => import('../views/admin/testimonials/Create'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/testimonial-edit/:id',
        name: 'testimonial-edit',
        component: () => import('../views/admin/testimonials/Edit'),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/blog-categories',
        name: 'blog-categories',
        component: () => import('../views/admin/blog_categories/Manage'),

        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/blog-category/create',
        name: 'blog-category-create',
        component: () => import('../views/admin/blog_categories/Create'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/admin/blog-category-edit/:id',
        name: 'blog-category-edit',
        component: () => import('../views/admin/blog_categories/Edit'),
        props: true,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/admin/Login'),
    meta: {
      visitor: true,
    },
  },
  {
    path: '/admin/logout',
    name: 'admin-logout',
    component: () => import('../components/admin/Logout'),
    meta: {
      requiresAuth: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({ name: 'admin-login' })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.visitor)) {
    if (store.getters.loggedIn) {
      next({ name: 'admin-dashboard' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
