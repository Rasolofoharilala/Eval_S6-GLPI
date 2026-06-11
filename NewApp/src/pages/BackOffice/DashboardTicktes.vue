<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { useTickets } from '@/composables/generated/useTickets'
import {
  getTicketStatusLabel,
  getTicketPriorityLabel,
  getTicketUrgencyLabel,
  getTicketImpactLabel,
} from '@/helpers/Dashboard/Tickets'
import {
  aggregateTicketCosts,
  countLinkedItems,
  type CostAggregate,
} from '@/services/dashboard/dashboardTicketStats'

const { tickets, loading, error, loadTickets } = useTickets()

// Agrégats complémentaires (coûts + éléments liés) chargés après les tickets.
const costs = ref<CostAggregate | null>(null)
const linkedItems = ref<number | null>(null)
const extraLoading = ref(false)

onMounted(async () => {
  await loadTickets()

  // Une fois les tickets chargés, on enrichit avec les coûts détaillés et le
  // nombre d'éléments liés (requêtes complémentaires, potentiellement longues).
  extraLoading.value = true
  try {
    const [c, n] = await Promise.all([
      aggregateTicketCosts(tickets.value),
      countLinkedItems(tickets.value),
    ])
    costs.value = c
    linkedItems.value = n
  } finally {
    extraLoading.value = false
  }
})

const total = computed(() => tickets.value.length)
const incidents = computed(() => tickets.value.filter((t) => t.type === 1))
const requetes = computed(() => tickets.value.filter((t) => t.type === 2))

function countBy<T extends string | number>(
  list: typeof tickets.value,
  keyFn: (t: (typeof tickets.value)[number]) => T,
): Record<string, number> {
  const map: Record<string, number> = {}
  for (const t of list) {
    const label = String(keyFn(t))
    map[label] = (map[label] ?? 0) + 1
  }
  return map
}

const countByStatus = computed(() =>
  countBy(tickets.value, (t) => getTicketStatusLabel(t.status) ?? 'Inconnu'),
)
const countByPriority = computed(() =>
  countBy(tickets.value, (t) => getTicketPriorityLabel(t.priority)),
)
const countByUrgency = computed(() =>
  countBy(tickets.value, (t) => getTicketUrgencyLabel(t.urgency)),
)
const countByImpact = computed(() => countBy(tickets.value, (t) => getTicketImpactLabel(t.impact)))

const countIncidentsByStatus = computed(() =>
  countBy(incidents.value, (t) => getTicketStatusLabel(t.status) ?? 'Inconnu'),
)
const countRequetesByStatus = computed(() =>
  countBy(requetes.value, (t) => getTicketStatusLabel(t.status) ?? 'Inconnu'),
)

// Formatage monétaire en Ariary (séparateurs de milliers).
function fmt(n: number | undefined): string {
  if (n === undefined) return '—'
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
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
            <th>Éléments liés</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ total }}</td>
            <td>{{ incidents.length }}</td>
            <td>{{ requetes.length }}</td>
            <td>
              <span v-if="linkedItems !== null">{{ linkedItems }}</span>
              <span v-else-if="extraLoading">…</span>
              <span v-else>—</span>
            </td>
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
      <h2>Urgences (tous types)</h2>
      <table border="1" cellpadding="6">
        <thead>
          <tr>
            <th>Urgence</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(count, label) in countByUrgency" :key="label">
            <td>{{ label }}</td>
            <td>{{ count }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Impacts (tous types)</h2>
      <table border="1" cellpadding="6">
        <thead>
          <tr>
            <th>Impact</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(count, label) in countByImpact" :key="label">
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

    <section>
      <h2>Coûts</h2>
      <p v-if="extraLoading && !costs">Calcul des coûts en cours…</p>
      <table v-else-if="costs" border="1" cellpadding="6">
        <tbody>
          <tr>
            <th>Entrées de coût</th>
            <td>{{ costs.entries }}</td>
          </tr>
          <tr>
            <th>Tickets avec coûts</th>
            <td>{{ costs.uniqueTickets }}</td>
          </tr>
          <tr>
            <th>Coût temps total</th>
            <td>{{ fmt(costs.totalTimeCost) }}</td>
          </tr>
          <tr>
            <th>Coût fixe total</th>
            <td>{{ fmt(costs.totalFixedCost) }}</td>
          </tr>
          <tr>
            <th>Coût global total</th>
            <td>
              <strong>{{ fmt(costs.totalOverall) }}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>—</p>
    </section>
  </div>

  <p v-else-if="!loading">Aucun ticket trouvé.</p>
</template>

<style scoped></style>
