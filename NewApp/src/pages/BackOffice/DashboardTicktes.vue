<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import BarreFiltres from '@/components/BarreFiltres.vue'
import { useTickets } from '@/composables/generated/useTickets'
import { useFiltreTickets } from '@/composables/useFiltreTickets'
import {
  libelleStatut,
  libellePriorite,
  libelleUrgence,
  libelleImpact,
  libelleType,
  OPTIONS_STATUT,
  OPTIONS_PRIORITE,
  OPTIONS_URGENCE,
  OPTIONS_IMPACT,
  OPTIONS_TYPE,
} from '@/config/tickets'
import {
  aggregateTicketCosts,
  countLinkedItems,
  type CostAggregate,
} from '@/services/dashboard/dashboardTicketStats'
import type { Ticket } from '@/services/generated/ticketService'
import { creerLogger } from '@/utils/pageLogger'
import { messageErreur } from '@/utils/messageErreur'

const log = creerLogger('Dashboard Tickets')

const { tickets, loading, error, loadTickets } = useTickets()

// ─── Filtres (composable central) : la liste filtrée alimente tous les compteurs
const { filtres, ticketsFiltres, reinitialiser } = useFiltreTickets(tickets)

// Description des champs affichés dans la barre de filtres.
const champsFiltres = [
  { cle: 'recherche', label: 'Recherche (id ou titre)', type: 'texte' as const },
  { cle: 'type', label: 'Type', type: 'select' as const, options: OPTIONS_TYPE },
  { cle: 'statut', label: 'Statut', type: 'select' as const, options: OPTIONS_STATUT },
  { cle: 'priorite', label: 'Priorité', type: 'select' as const, options: OPTIONS_PRIORITE },
  { cle: 'urgence', label: 'Urgence', type: 'select' as const, options: OPTIONS_URGENCE },
  { cle: 'impact', label: 'Impact', type: 'select' as const, options: OPTIONS_IMPACT },
  { cle: 'dateDebut', label: 'Ouvert du', type: 'date' as const },
  { cle: 'dateFin', label: 'au', type: 'date' as const },
]

// ─── Agrégats complémentaires (coûts + éléments liés), sur TOUS les tickets
const costs = ref<CostAggregate | null>(null)
const linkedItems = ref<number | null>(null)
const extraLoading = ref(false)

onMounted(async () => {
  log.info('Chargement des tickets...')
  await loadTickets()
  log.succes(tickets.value.length + ' tickets chargés')

  log.info('Calcul des coûts et des éléments liés...')
  extraLoading.value = true
  try {
    const [c, n] = await Promise.all([
      aggregateTicketCosts(tickets.value),
      countLinkedItems(tickets.value),
    ])
    costs.value = c
    linkedItems.value = n
    log.succes('Agrégats calculés : ' + c.entries + ' entrées de coût, ' + n + ' éléments liés')
  } catch (err) {
    log.erreur('Erreur pendant le calcul des agrégats : ' + messageErreur(err), err)
  } finally {
    extraLoading.value = false
  }
})

// ─── L'id du statut (forme {id, name}) ───
function idStatut(t: Ticket): number {
  return t.status && typeof t.status === 'object' ? (t.status.id ?? 0) : 0
}

// ─── Tout est calculé sur la liste FILTRÉE ───
const total = computed(() => ticketsFiltres.value.length)
const incidents = computed(() => ticketsFiltres.value.filter((t) => t.type === 1))
const requetes = computed(() => ticketsFiltres.value.filter((t) => t.type === 2))

// Compte les tickets par étiquette (statut, priorité...) : version simple.
function compterPar(liste: Ticket[], getEtiquette: (t: Ticket) => string): Record<string, number> {
  const compte: Record<string, number> = {}
  for (const t of liste) {
    const e = getEtiquette(t)
    compte[e] = (compte[e] ?? 0) + 1
  }
  return compte
}

const countByStatus = computed(() =>
  compterPar(ticketsFiltres.value, (t) => libelleStatut(idStatut(t))),
)
const countByPriority = computed(() =>
  compterPar(ticketsFiltres.value, (t) => libellePriorite(t.priority)),
)
const countByUrgency = computed(() =>
  compterPar(ticketsFiltres.value, (t) => libelleUrgence(t.urgency)),
)
const countByImpact = computed(() =>
  compterPar(ticketsFiltres.value, (t) => libelleImpact(t.impact)),
)
const countByType = computed(() => compterPar(ticketsFiltres.value, (t) => libelleType(t.type)))

// Formatage monétaire (séparateurs de milliers).
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
    <BarreFiltres :modele="filtres" :champs="champsFiltres" @reset="reinitialiser" />

    <p>
      <strong>{{ total }}</strong> ticket(s) affiché(s) sur {{ tickets.length }} au total.
    </p>

    <section>
      <h2>Vue globale (filtrée)</h2>
      <table border="1" cellpadding="6">
        <thead>
          <tr>
            <th>Total</th>
            <th>Incidents</th>
            <th>Requêtes</th>
            <th>Éléments liés (tous tickets)</th>
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
      <h2>Par type</h2>
      <table border="1" cellpadding="6">
        <thead>
          <tr>
            <th>Type</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(count, label) in countByType" :key="label">
            <td>{{ label }}</td>
            <td>{{ count }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Statuts</h2>
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
      <h2>Priorités</h2>
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
      <h2>Urgences</h2>
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
      <h2>Impacts</h2>
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
      <h2>Coûts (tous les tickets)</h2>
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
