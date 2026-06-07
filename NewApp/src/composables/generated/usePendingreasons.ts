// Auto-generated file. Do not edit manually.
// Composable generated from pendingreasonService.ts.

import { ref } from 'vue'
import { getPendingreasons, getPendingreasonById } from '@/services/generated/pendingreasonService'
import type { PendingReason } from '@/services/generated/pendingreasonService'

export function usePendingreasons() {
  const pendingreasons = ref<PendingReason[]>([])
  const selectedPendingreason = ref<PendingReason | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPendingreasons() {
    loading.value = true
    error.value = null

    try {
      pendingreasons.value = await getPendingreasons()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPendingreasonById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPendingreason.value = await getPendingreasonById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    pendingreasons,
    selectedPendingreason,
    loading,
    error,
    loadPendingreasons,
    loadPendingreasonById,
  }
}
