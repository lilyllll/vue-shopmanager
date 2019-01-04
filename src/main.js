// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import moment from 'moment'

import App from './App'
import router from './router'

import Http from '@/plugins/http'
// 样式文件单独引入
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/index.css'

Vue.filter('fmtData', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Http)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
