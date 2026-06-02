import { createRouter, createWebHistory } from 'vue-router'
import login from '@/pages/BackOffice/LoginBackOffice.vue'
import accueil from '@/pages/BackOffice/AccueilBackOffice.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: login,
      component: login,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/accueil',
      name: accueil,
      component: accueil,
      meta: {
        title: 'Accueil'
      }
    },
  ],
})

export default router
