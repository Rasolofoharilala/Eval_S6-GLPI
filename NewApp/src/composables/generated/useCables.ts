// Auto-generated file. Do not edit manually.
// Composable generated from cableService.ts.

import { ref } from 'vue'
import { getCables, getCableById } from '@/services/generated/cableService'
import type { Cable } from '@/services/generated/cableService'

export function useCables() {
  const cables = ref<Cable[]>([])
  const selectedCable = ref<Cable | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCables() {
    loading.value = true
    error.value = null

    try {
      cables.value = await getCables()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadCableById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedCable.value = await getCableById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    cables,
    selectedCable,
    loading,
    error,
    loadCables,
    loadCableById,
  }
}
