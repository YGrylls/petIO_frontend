import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/login-page.vue'
// import Adoption from '@/components/adoption-page.vue'
// import AdoptionDetail from '@/components/adoption-detail.vue'
// import AdoptionList from '@/components/adoption-list.vue'

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
        component:()=>import('@/components/login-page.vue')
      },
      {
          path:'/adoption',
          name:'adoption',
          component:()=>import('@/components/adoption-page.vue'),
          children:[
              {
                  path:'list',
                  name:"adoptionList",
                  component:()=>import('@/components/adoption-list.vue')
              },
              {
                  path:'detail/:id',
                  name:"adoptionDetail",
                  component:()=>import('@/components/adoption-detail.vue')
              },
              {
                  path:'publish',
                  name:'adoptionPublish',
                  component:()=>import('@/components/adoption-publish.vue')
              }
          ]
      }


  ]
})
