import { createRouter, createWebHistory } from 'vue-router'
import login from '@/pages/login.vue'
import accueil from '@/pages/accueil.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: login,
    },
    {
      path:'/accueil',
      name: accueil,
      component: accueil
    }
  ],
})

export default router
