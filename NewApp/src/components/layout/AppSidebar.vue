<template>
  <div class=""></div>
  <aside>
    <h3>GLPI</h3>

    <ul>
      <li
        v-for="menu in menus"
        :key="menu.label"
      >
        <template v-if="menu.path">
          <RouterLink :to="menu.path">
            {{ menu.label }}
          </RouterLink>
        </template>

        <template v-else>
          <span>{{ menu.label }}</span>

          <ul>
            <li
              v-for="child in menu.children"
              :key="child.path"
            >
              <RouterLink :to="child.path">
                {{ child.label }}
              </RouterLink>
            </li>
          </ul>
        </template>
      </li>
      <deconnexionButton />
    </ul>
  </aside>
</template>

<script setup lang="ts">

import deconnexionButton from '@/components/common/deconnexionButton.vue'

const menus = [
  {
    label: 'Tableau de bord',
    path: '/'
  },
  {
    label: 'Accueil',
    path: '/accueil'
  },
  {
    label: 'Reinitialisation',
    children: [
      {
        label: 'Reinitialisation de la base GLPI',
        path: '/reinitialisationBase'
      }
    ]
  }
]
</script>