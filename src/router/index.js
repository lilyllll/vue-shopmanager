import Vue from 'vue'
import Router from 'vue-router'
// 引入登录组件
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home
    }
  ]
})
