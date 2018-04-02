// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import http from './services/http/httpAxios'
import api from './services/api'
import utils from './utils'

import VePie from 'v-charts/lib/pie'
import VeLine from 'v-charts/lib/line'
import VeHistogram from 'v-charts/lib/histogram'
import Map from 'v-charts/lib/map'
Vue.component(VePie.name, VePie)
Vue.component(VeLine.name, VeLine)
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(Map.name, Map)

Vue.prototype.$utils = utils
Vue.prototype.$http = http
Vue.prototype.$api = api

Vue.config.productionTip = false

// mock，需要时引入即可
// require('./mock/index')

// 全局路由守卫
router.beforeEach((to, from, next) => {
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
