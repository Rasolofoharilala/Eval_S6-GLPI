<script setup lang="ts">
import { onMounted } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { useTickets } from '@/composables/generated/useTickets'
import {
  getTicketStatusLabel,
  getTicketRequestTypeLabel,
  getTicketCategoryLabel,
  getTicketRequesterName,
  getTicketAssignedName,
  getTicketPriorityLabel,
  getTicketUrgencyLabel,
  getTicketImpactLabel,
  removeHtmlTags,
} from '@/helpers/Dashboard/Tickets'
import { creerLogger } from '@/utils/pageLogger'

const log = creerLogger('Focus Tickets')

const { tickets, selectedTicket, loading, error, loadTickets, loadTicketById } = useTickets()

onMounted(async () => {
  log.info('Chargement des tickets…')
  await loadTickets()
  // ─── Le composable remplit error.value lui-même : on vérifie après coup
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

function getTypeLabel(type?: number): string {
  if (type === 1) return 'Incident'
  if (type === 2) return 'Requête'
  return 'Non renseigné'
}
</script>

<template>
  <AppSidebar />
  <h1>Focus : Tickets</h1>

  <p v-if="loading">Chargement...</p>
  <p v-if="error">Erreur : {{ error }}</p>

  <div v-if="!loading && tickets.length > 0">
    <section>
      <h2>Liste des tickets</h2>
      <table border="1" cellpadding="6">
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Type</th>
            <th>Statut</th>
            <th>Priorité</th>
            <th>Date création</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="ticket in tickets"
            :key="ticket.id"
            :style="selectedTicket?.id === ticket.id ? 'background: #eee' : ''"
          >
            <td>{{ ticket.id }}</td>
            <td>{{ ticket.name }}</td>
            <td>{{ getTypeLabel(ticket.type) }}</td>
            <td>{{ getTicketStatusLabel(ticket.status) }}</td>
            <td>{{ getTicketPriorityLabel(ticket.priority) }}</td>
            <td>{{ ticket.date_creation ?? '—' }}</td>
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
            <td>{{ getTypeLabel(selectedTicket.type) }}</td>
          </tr>
          <tr>
            <th>Statut</th>
            <td>{{ getTicketStatusLabel(selectedTicket.status) }}</td>
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
            <td>{{ getTicketPriorityLabel(selectedTicket.priority) }}</td>
          </tr>
          <tr>
            <th>Urgence</th>
            <td>{{ getTicketUrgencyLabel(selectedTicket.urgency) }}</td>
          </tr>
          <tr>
            <th>Impact</th>
            <td>{{ getTicketImpactLabel(selectedTicket.impact) }}</td>
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
            <th>Date création</th>
            <td>{{ selectedTicket.date_creation ?? '—' }}</td>
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
