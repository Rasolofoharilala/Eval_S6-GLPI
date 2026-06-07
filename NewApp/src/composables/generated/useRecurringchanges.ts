// Auto-generated file. Do not edit manually.
// Composable generated from recurringchangeService.ts.

import { ref } from 'vue'
import {
  getRecurringchanges,
  getRecurringchangeById,
} from '@/services/generated/recurringchangeService'
import type { RecurringChange } from '@/services/generated/recurringchangeService'

export function useRecurringchanges() {
  const recurringchanges = ref<RecurringChange[]>([])
  const selectedRecurringchange = ref<RecurringChange | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadRecurringchanges() {
    loading.value = true
    error.value = null

    try {
      recurringchanges.value = await getRecurringchanges()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadRecurringchangeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedRecurringchange.value = await getRecurringchangeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    recurringchanges,
    selectedRecurringchange,
    loading,
    error,
    loadRecurringchanges,
    loadRecurringchangeById,
  }
}
