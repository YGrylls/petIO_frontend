import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login-page.vue'
import Adoption from '@/components/adoption-page.vue'
import AdoptionDetail from '@/components/adoption-detail.vue'
import AdoptionList from '@/components/adoption-list.vue'

Vue.use(Router)

export default new Router({
  routes: [
      {
        path:'/',
          redirect:'/adoption/list'
      },
      {
        path:'/login',
          name:'Login',
          component:Login
      },
      {
          path:'/adoption',
          name:'adoption',
          component: Adoption,
          children:[
              {
                  path:'list',
                  name:"adoptionList",
                  component:AdoptionList
              },
              {
                  path:'detail/:id',
                  name:"adoptionDetail",
                  component:AdoptionDetail,
              }
          ]
      }


  ]
})
