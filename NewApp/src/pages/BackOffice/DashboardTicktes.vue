<script setup lang="ts">
import { computed, onMounted } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { useTickets } from '@/composables/generated/useTickets'
import { getTicketStatusLabel, getTicketPriorityLabel } from '@/helpers/Dashboard/Tickets'

const { tickets, loading, error, loadTickets } = useTickets()

onMounted(async () => {
  await loadTickets()
})

const total = computed(() => tickets.value.length)
const incidents = computed(() => tickets.value.filter((t) => t.type === 1))
const requetes = computed(() => tickets.value.filter((t) => t.type === 2))

const countByStatus = computed(() => {
  const map: Record<string, number> = {}
  for (const t of tickets.value) {
    const label = getTicketStatusLabel(t.status) ?? 'Inconnu'
    map[label] = (map[label] ?? 0) + 1
  }
  return map
})

const countByPriority = computed(() => {
  const map: Record<string, number> = {}
  for (const t of tickets.value) {
    const label = getTicketPriorityLabel(t.priority)
    map[label] = (map[label] ?? 0) + 1
  }
  return map
})

const countIncidentsByStatus = computed(() => {
  const map: Record<string, number> = {}
  for (const t of incidents.value) {
    const label = getTicketStatusLabel(t.status) ?? 'Inconnu'
    map[label] = (map[label] ?? 0) + 1
  }
  return map
})

const countRequetesByStatus = computed(() => {
  const map: Record<string, number> = {}
  for (const t of requetes.value) {
    const label = getTicketStatusLabel(t.status) ?? 'Inconnu'
    map[label] = (map[label] ?? 0) + 1
  }
  return map
})
</script>

<template>
  <AppSidebar />
  <h1>Dashboard : Tickets</h1>

  <p v-if="loading">Chargement...</p>
  <p v-if="error">Erreur : {{ error }}</p>

  <div v-if="!loading && tickets.length > 0">
    <section>
      <h2>Vue globale</h2>
      <table border="1" cellpadding="6">
        <thead>
          <tr>
            <th>Total</th>
            <th>Incidents</th>
            <th>Requêtes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ total }}</td>
            <td>{{ incidents.length }}</td>
            <td>{{ requetes.length }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Statuts (tous types)</h2>
      <table border="1" cellpadding="6">
        <thead>
          <tr>
            <th>Statut</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(count, label) in countByStatus" :key="label">
            <td>{{ label }}</td>
            <td>{{ count }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Priorités (tous types)</h2>
      <table border="1" cellpadding="6">
        <thead>
          <tr>
            <th>Priorité</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(count, label) in countByPriority" :key="label">
            <td>{{ label }}</td>
            <td>{{ count }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Incidents — par statut</h2>
      <p>Total incidents : {{ incidents.length }}</p>
      <table border="1" cellpadding="6">
        <thead>
          <tr>
            <th>Statut</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(count, label) in countIncidentsByStatus" :key="label">
            <td>{{ label }}</td>
            <td>{{ count }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Requêtes — par statut</h2>
      <p>Total requêtes : {{ requetes.length }}</p>
      <table border="1" cellpadding="6">
        <thead>
          <tr>
            <th>Statut</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(count, label) in countRequetesByStatus" :key="label">
            <td>{{ label }}</td>
            <td>{{ count }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>

  <p v-else-if="!loading">Aucun ticket trouvé.</p>
</template>

<style scoped></style>
