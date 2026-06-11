// Auto-generated file. Do not edit manually.
// Composable generated from ticketService.ts.

import { ref } from 'vue'
import { getTickets, getTicketById } from '@/services/generated/ticketService'
import type { Ticket } from '@/services/generated/ticketService'

  const tickets = ref<Ticket[]>([])
  const selectedTicket = ref<Ticket | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
export function useTickets() {

  async function loadTickets() {
    tickets.value = []
    loading.value = true
    error.value = null

    try {
      tickets.value = await getTickets()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadTicketById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedTicket.value = await getTicketById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    tickets,
    selectedTicket,
    loading,
    error,
    loadTickets,
    loadTicketById,
  }
}
