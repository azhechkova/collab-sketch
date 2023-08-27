import * as VueRouter from 'vue-router'
import TheHome from '@/components/pages/TheHome.vue'
import TheRoom from '@/components/pages/TheRoom.vue'

const routes = [
  {
    path: '/',
    component: TheHome
  },
  {
    path: '/:room',
    component: TheRoom
  }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})

export default router
