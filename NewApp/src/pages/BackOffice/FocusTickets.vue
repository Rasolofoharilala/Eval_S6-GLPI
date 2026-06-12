<script setup lang="ts">
import { onMounted } from 'vue'
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
  getTicketRequestTypeLabel,
  getTicketCategoryLabel,
  getTicketRequesterName,
  getTicketAssignedName,
  removeHtmlTags,
} from '@/helpers/Dashboard/Tickets'
import type { Ticket } from '@/services/generated/ticketService'
import { creerLogger } from '@/utils/pageLogger'

const log = creerLogger('Focus Tickets')

const { tickets, selectedTicket, loading, error, loadTickets, loadTicketById } = useTickets()

// ─── Filtres centralisés : la liste affichée est la liste filtrée
const { filtres, ticketsFiltres, reinitialiser } = useFiltreTickets(tickets)

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

onMounted(async () => {
  log.info('Chargement des tickets…')
  await loadTickets()
  if (error.value) {
    log.erreur('Échec du chargement des tickets', error.value)
  } else {
    log.succes(`${tickets.value.length} tickets chargés`)
  }
})

async function selectTicket(id?: number) {
  if (id === undefined) return
  log.info(`Sélection du ticket #${id}`)
  await loadTicketById(id)
}

// L'id du statut (forme {id, name}).
function idStatut(t: Ticket): number {
  return t.status && typeof t.status === 'object' ? (t.status.id ?? 0) : 0
}
</script>

<template>
  <AppSidebar />
  <h1>Focus : Tickets</h1>

  <p v-if="loading">Chargement...</p>
  <p v-if="error">Erreur : {{ error }}</p>

  <div v-if="!loading && tickets.length > 0">
    <BarreFiltres :modele="filtres" :champs="champsFiltres" @reset="reinitialiser" />

    <section>
      <h2>
        Liste des tickets ({{ ticketsFiltres.length }} affiché(s) sur {{ tickets.length }})
      </h2>
      <p v-if="ticketsFiltres.length === 0">Aucun ticket ne correspond aux filtres.</p>
      <table v-else border="1" cellpadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Type</th>
            <th>Statut</th>
            <th>Priorité</th>
            <th>Date ouverture</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ticket in ticketsFiltres"
            :key="ticket.id"
            :style="selectedTicket?.id === ticket.id ? 'background: #eee' : ''"
          >
            <td>{{ ticket.id }}</td>
            <td>{{ ticket.name }}</td>
            <td>{{ libelleType(ticket.type) }}</td>
            <td>{{ libelleStatut(idStatut(ticket)) }}</td>
            <td>{{ libellePriorite(ticket.priority) }}</td>
            <td>{{ ticket.date ?? ticket.date_creation ?? '—' }}</td>
            <td>
              <button @click="selectTicket(ticket.id)">Voir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <section v-if="selectedTicket">
      <h2>Fiche ticket #{{ selectedTicket.id }} — {{ selectedTicket.name }}</h2>
      <table border="1" cellpadding="6">
        <tbody>
          <tr>
            <th>Type</th>
            <td>{{ libelleType(selectedTicket.type) }}</td>
          </tr>
          <tr>
            <th>Statut</th>
            <td>{{ libelleStatut(idStatut(selectedTicket)) }}</td>
          </tr>
          <tr>
            <th>Source de la demande</th>
            <td>{{ getTicketRequestTypeLabel(selectedTicket.request_type) }}</td>
          </tr>
          <tr>
            <th>Catégorie</th>
            <td>{{ getTicketCategoryLabel(selectedTicket.category) }}</td>
          </tr>
          <tr>
            <th>Priorité</th>
            <td>{{ libellePriorite(selectedTicket.priority) }}</td>
          </tr>
          <tr>
            <th>Urgence</th>
            <td>{{ libelleUrgence(selectedTicket.urgency) }}</td>
          </tr>
          <tr>
            <th>Impact</th>
            <td>{{ libelleImpact(selectedTicket.impact) }}</td>
          </tr>
          <tr>
            <th>Demandeur</th>
            <td>{{ getTicketRequesterName(selectedTicket.team) }}</td>
          </tr>
          <tr>
            <th>Technicien assigné</th>
            <td>{{ getTicketAssignedName(selectedTicket.team) }}</td>
          </tr>
          <tr>
            <th>Date ouverture</th>
            <td>{{ selectedTicket.date ?? selectedTicket.date_creation ?? '—' }}</td>
          </tr>
          <tr>
            <th>Date résolution</th>
            <td>{{ selectedTicket.date_solve ?? '—' }}</td>
          </tr>
          <tr>
            <th>Date clôture</th>
            <td>{{ selectedTicket.date_close ?? '—' }}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{{ removeHtmlTags(selectedTicket.content) }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>

  <p v-else-if="!loading">Aucun ticket trouvé.</p>
</template>

<style scoped></style>
