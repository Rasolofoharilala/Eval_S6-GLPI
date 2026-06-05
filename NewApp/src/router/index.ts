import { createRouter, createWebHistory } from 'vue-router'
import login from '@/pages/BackOffice/LoginBackOffice.vue'
import accueil from '@/pages/BackOffice/AccueilBackOffice.vue'
import reinitialisationBase from '@/pages/BackOffice/ReinitialisationBackOffice.vue'

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
    {
      path: '/reinitialisationBase',
      name: reinitialisationBase,
      component: reinitialisationBase,
      meta: {
        title: 'Reinitialisation'
      }
    }
  ],
})

export default router
