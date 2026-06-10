<script setup lang="ts">
import { onMounted } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { useTickets } from '@/composables/generated/useTickets'
import {
  getTicketStatusLabel,
  getTicketLocationLabel,
  getTicketRequestTypeLabel,
  getTicketCategoryLabel,
  getTicketRequesterName,
  getTicketAssignedName,
  getTicketPriorityLabel,
  getTicketUrgencyLabel,
  getTicketImpactLabel,
  removeHtmlTags
} from '@/helpers/Dashboard/Tickets'

const { tickets, selectedTicket, loading, error, loadTickets, loadTicketById } = useTickets()

onMounted(async () => {
  await loadTickets()
  console.log(`Nombre de tickets chargés : ${tickets.value.length}`)
})

async function selectTicket(id?: number) {
  if (id === undefined) {
    return
  }

  await loadTicketById(id)
  console.log('Ticket sélectionné :', selectedTicket.value)
}
</script>

<template>
  <AppSidebar />
  <h1>Dashboard : Tickets</h1>

  <p v-if="loading">Chargement...</p>
  <p v-if="error">Erreur : {{ error }}</p>
  <!-- <pre>{{ tickets }}</pre> -->
  <!-- <pre>{{ selectedTicket }}</pre> -->
  <a href="" v-for="ticket in tickets" :key="ticket.id" @click.prevent="selectTicket(ticket.id)">
    {{ ticket.name }}
    <br />
  </a>

  <!-- <div v-if="selectedTicket">
    <h2>{{ selectedTicket.name }}</h2>

    <p>Statut : {{ getTicketStatusLabel(selectedTicket.status) }}</p>
    <p>Lieu : {{ getTicketLocationLabel(selectedTicket.location) }}</p>
    <p>Type : {{ getTicketRequestTypeLabel(selectedTicket.request_type) }}</p>
    <p>Catégorie : {{ getTicketCategoryLabel(selectedTicket.category) }}</p>
    <p>Demandeur : {{ getTicketRequesterName(selectedTicket.team) }}</p>
    <p>Technicien : {{ getTicketAssignedName(selectedTicket.team) }}</p>
    <p>Priorité : {{ getTicketPriorityLabel(selectedTicket.priority) }}</p>
    <p>Urgence : {{ getTicketUrgencyLabel(selectedTicket.urgency) }}</p>
    <p>Impact : {{ getTicketImpactLabel(selectedTicket.impact) }}</p>
    <p>Description : {{ removeHtmlTags(selectedTicket.content) }}</p>
  </div> -->

  <div v-if="tickets.length > 0">
    <!-- <div v-for="ticket in tickets" :key="ticket.id">
      <h2>{{ ticket.name }}</h2>

      <p>Statut : {{ getTicketStatusLabel(ticket.status) }}</p>
      <p>Lieu : {{ getTicketLocationLabel(ticket.location) }}</p>
      <p>Type : {{ getTicketRequestTypeLabel(ticket.request_type) }}</p>
      <p>Catégorie : {{ getTicketCategoryLabel(ticket.category) }}</p>
      <p>Demandeur : {{ getTicketRequesterName(ticket.team) }}</p>
      <p>Technicien : {{ getTicketAssignedName(ticket.team) }}</p>
      <p>Priorité : {{ getTicketPriorityLabel(ticket.priority) }}</p>
      <p>Urgence : {{ getTicketUrgencyLabel(ticket.urgency) }}</p>
      <p>Impact : {{ getTicketImpactLabel(ticket.impact) }}</p>
      <p>Description : {{ removeHtmlTags(ticket.content) }}</p>
    </div> -->
  </div>

  <p v-else-if="!loading">Aucun ticket trouvé.</p>
</template>

<style scoped></style>
