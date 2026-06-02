// Auto-generated file. Do not edit manually.
// Composable generated from ticketService.ts.

import { ref } from 'vue'
import { getTickets, getTicketById } from '@/services/generated/ticketService'

export function useTickets() {
  const tickets = ref<any[]>([])
  const selectedTicket = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadTickets() {
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
