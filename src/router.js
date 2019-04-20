import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login-page.vue'
import nav from '@/components/nav-menu.vue'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path:'/',
          redirect:'/login'
      },
      {
        path:'/login',
          name:'Login',
          component:Login
      },
      {
          path:'/nav',
          name:'nav',
          component: nav
      }


  ]
})
