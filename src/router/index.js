import { createRouter, createWebHistory } from 'vue-router'



import login from '../views/login.vue'
import tjbg from '../views/tjbg.vue'
import bjtjbg from '../views/bjtjbg.vue'


const routes = [ 
  {
    path: '/',
    name: 'login',
    component: login
  },

  {
    path: '/tjbg',
    name: 'tjbg',
    component: tjbg
  },
 
  {
    path: '/bjtjbg',
    name: 'bjtjbg',
    component: bjtjbg
  },
 
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
