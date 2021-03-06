import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap'
import 'admin-lte'
import 'axios'
import 'core-js'
import './assets/scss/app.scss'

// window.jQuery = require('../node_modules/jquery/dist/jquery.js')
// window.$ = require('../node_modules/jquery/dist/jquery.js')
// // require('./frontend_assets/js/jquery-migrate-3.0.0.js')
// window.Popper = window.popper = require('popper.js')
// require('./frontend_assets/js/bootstrap.min.js')
// // require('./frontend_assets/js/modernizr.min.js')
// // window.modernizr = window.Modernizr = require('modernizr')
// // require('./frontend_assets/js/scrollup.js')
// window.ScrollUp = require('../node_modules/scrollup/index.js')
// require('../node_modules/jquery-fancybox/source/js/jquery.fancybox.js')
// // require('./frontend_assets/js/jquery-fancybox.min.js')
// // require('./frontend_assets/js/cubeportfolio.min.js')
// // require('./frontend_assets/js/slicknav.min.js')
// require('../node_modules/slicknav/dist/jquery.slicknav.js')
// // require('./frontend_assets/js/owl-carousel.min.js')
// require('owl.carousel/dist/owl.carousel')
// // require('./frontend_assets/js/easing.js')
// window.Easing = require('../node_modules/easing')
// require('../node_modules/magnific-popup/dist/jquery.magnific-popup.js')
// // require('./frontend_assets/js/magnific-popup.min.js')
// require('./frontend_assets/js/active.js')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
