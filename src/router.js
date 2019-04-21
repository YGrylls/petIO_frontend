import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login-page.vue'
import AdoptionDetail from '@/components/adoption-detail.vue'

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
          path:'/adoption/detail',
          name:'nav',
          component: AdoptionDetail
      }


  ]
})
