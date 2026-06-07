// Auto-generated file. Do not edit manually.
// Composable generated from transferService.ts.

import { ref } from 'vue'
import { getTransfers } from '@/services/generated/transferService'

export function useTransfers() {
  const transfers = ref<unknown[]>([])
  const selectedTransfer = ref<unknown | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadTransfers() {
    loading.value = true
    error.value = null

    try {
      transfers.value = await getTransfers()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    transfers,
    selectedTransfer,
    loading,
    error,
    loadTransfers,
  }
}
