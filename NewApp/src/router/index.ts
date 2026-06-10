import { createRouter, createWebHistory } from 'vue-router'

import { isAuthenticated } from '@/auth/authService'

import login from '@/pages/BackOffice/LoginBackOffice.vue'
import accueil from '@/pages/BackOffice/AccueilBackOffice.vue'
import reinitialisationBase from '@/pages/BackOffice/ReinitialisationBackOffice.vue'
import importPages from '@/pages/BackOffice/ImportBackOffice.vue'
import dashboardGeneral from '@/pages/BackOffice/DashboardElementGeneral.vue'
import dashboardTickets from '@/pages/BackOffice/DashboardTicktes.vue'

import accueilFrontOffice from '@/pages/FrontOffice/AccueilFrontOffice.vue'
import listeElement from '@/pages/FrontOffice/ListeElement.vue'
import createTicket from '@/pages/FrontOffice/CreateTickets.vue'
import focusTickets from '@/pages/BackOffice/FocusTickets.vue'

import stockageCouleur from '@/pages/BackOffice/StockageValeursCouleur.vue'
import stockageLangue from '@/pages/BackOffice/StockageValeursVersionLangue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/accueil',
      name: 'accueil',
      component: accueil,
      meta: {
        title: 'Accueil',
        requiresAuth: true,
      },
    },
    {
      path: '/reinitialisationBase',
      name: 'reinitialisationBase',
      component: reinitialisationBase,
      meta: {
        title: 'Reinitialisation',
        requiresAuth: true,
      },
    },
    {
      path: '/importFichier',
      name: 'importPages',
      component: importPages,
      meta: {
        title: 'importPages',
        requiresAuth: true,
      },
    },
    {
      path: '/dashboardElementGeneral',
      name: 'dashboardGeneral',
      component: dashboardGeneral,
      meta: {
        title: 'dashboardGeneral',
        requiresAuth: true,
      },
    },
    {
      path: '/dashboardTickets',
      name: 'dashboardTickets',
      component: dashboardTickets,
      meta: {
        title: 'dashboardTickets',
        requiresAuth: true,
      },
    },
    {
      path: '/accueilFrontOffice',
      name: 'accueilFrontOffice',
      component: accueilFrontOffice,
      meta: {
        title: 'Accueil Front Office',
      },
    },
    {
      path: '/listeElement',
      name: 'listeElement',
      component: listeElement,
      meta: {
        title: 'Liste element Front Office',
      },
    },
    {
      path: '/createTicket',
      name: 'createTicket',
      component: createTicket,
      meta: {
        title: 'createTicket Front Office',
      },
    },
    {
      path: '/focusTickets',
      name: 'focusTickets',
      component: focusTickets,
      meta: {
        title: 'focusTickets Front Office',
      },
    },
    {
      path: '/stockageCouleur',
      name: 'stockageCouleur',
      component: stockageCouleur,
      meta: {
        title: 'stockageCouleur Front Office',
      },
    },
    {
      path: '/stockageLangue',
      name: 'stockageLangue',
      component: stockageLangue,
      meta: {
        title: 'stockageLangue Front Office',
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
