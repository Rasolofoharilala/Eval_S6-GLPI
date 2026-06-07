// Auto-generated file. Do not edit manually.
// Composable generated from recurringticketService.ts.

import { ref } from 'vue'
import {
  getRecurringtickets,
  getRecurringticketById,
} from '@/services/generated/recurringticketService'
import type { RecurringTicket } from '@/services/generated/recurringticketService'

export function useRecurringtickets() {
  const recurringtickets = ref<RecurringTicket[]>([])
  const selectedRecurringticket = ref<RecurringTicket | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadRecurringtickets() {
    loading.value = true
    error.value = null

    try {
      recurringtickets.value = await getRecurringtickets()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadRecurringticketById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedRecurringticket.value = await getRecurringticketById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    recurringtickets,
    selectedRecurringticket,
    loading,
    error,
    loadRecurringtickets,
    loadRecurringticketById,
  }
}
