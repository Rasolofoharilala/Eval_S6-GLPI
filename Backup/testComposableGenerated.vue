<script setup lang="ts">
import { onMounted } from 'vue'
import { useUsers } from '@/composables/generated/useUsers'
import { useTickets } from '@/composables/generated/useTickets'
import { useComputers } from '@/composables/generated/useComputers'

const {
  users,
  loading: usersLoading,
  error: usersError,
  loadUsers,
} = useUsers()

const {
  tickets,
  loadTickets,
} = useTickets()

const {
  computers,
  loadComputers,
} = useComputers()

onMounted(async () => {
  await loadUsers()
  await loadTickets()
  await loadComputers()
})
</script>

<template>
  <main>
    <h1>Back Office GLPI</h1>

    <p v-if="usersLoading">Chargement...</p>
    <p v-if="usersError">{{ usersError }}</p>

    <h2>Utilisateurs</h2>
    <pre>{{ users }}</pre>

    <h2>Tickets</h2>
    <pre>{{ tickets }}</pre>

    <h2>Ordinateurs</h2>
    <pre>{{ computers }}</pre>
  </main>
</template>