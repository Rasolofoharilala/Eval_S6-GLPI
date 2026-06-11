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
      <li><deconnexionButton /></li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import deconnexionButton from '@/components/common/deconnexionButton.vue'

type MenuEntry = {
  label: string
  path?: string
  children?: { label: string; path: string }[]
}

const menus: MenuEntry[] = [
  {
    label: 'Liste des elements',
    path: '/listeElement',
  },
  {
    label: 'Creation ticket',
    path: '/createTicket',
  },
  {
    label: 'Kanban tickets',
    path: '/kanbanTickets',
  },
]
</script>
