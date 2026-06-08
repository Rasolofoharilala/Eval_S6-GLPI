import { createRouter, createWebHistory } from 'vue-router'

import { isAuthenticated } from '@/auth/authService.ts'

import login from '@/pages/BackOffice/LoginBackOffice.vue'
import accueil from '@/pages/BackOffice/AccueilBackOffice.vue'
import reinitialisationBase from '@/pages/BackOffice/ReinitialisationBackOffice.vue'
import importPages from '@/pages/BackOffice/ImportBackOffice.vue'
import dashboardGeneral from '@/pages/BackOffice/DashboardElementGeneral.vue'
import dashboardTickets from '@/pages/BackOffice/DashboardTicktes.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: login,
      component: login,
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/accueil',
      name: accueil,
      component: accueil,
      meta: {
        title: 'Accueil',
        requiresAuth: true,
      },
    },
    {
      path: '/reinitialisationBase',
      name: reinitialisationBase,
      component: reinitialisationBase,
      meta: {
        title: 'Reinitialisation',
        requiresAuth: true,
      },
    },
    {
      path: '/importFichier',
      name: importPages,
      component: importPages,
      meta: {
        title: 'importPages',
        requiresAuth: true,
      },
    },
    {
      path: '/dashboardElementGeneral',
      name: dashboardGeneral,
      component: dashboardGeneral,
      meta: {
        title: 'dashboardGeneral',
        requiresAuth: true,
      },
    },
    {
      path: '/dashboardTickets',
      name: dashboardTickets,
      component: dashboardTickets,
      meta: {
        title: 'dashboardTickets',
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    return '/login'
  }
})

export default router
