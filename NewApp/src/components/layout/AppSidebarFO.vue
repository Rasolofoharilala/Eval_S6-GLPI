<template>
  <div class=""></div>
  <aside>
    <h3>FRONT OFFICE</h3>

    <ul>
      <li v-for="menu in menus" :key="menu.label">
        <template v-if="menu.path">
          <RouterLink :to="menu.path">
            {{ menu.label }}
          </RouterLink>
        </template>

        <template v-else>
          <span>{{ menu.label }}</span>

          <ul>
            <li v-for="child in menu.children" :key="child.path">
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
    label: 'Liste des elements',
    path: '/listeElement'
  },
  {
    label: 'Dashboard',
    children: [
      {
        label: 'Element General',
        // path: '/dashboardElementGeneral',
      },
      {
        label: 'Ticket General',
        // path: '/dashboardTickets',
      },
    ],
  },
]
</script>
