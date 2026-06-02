// Auto-generated file. Do not edit manually.
// Composable generated from powersupplyService.ts.

import { ref } from 'vue'
import { getPowersupplies, getPowersupplyById } from '@/services/generated/powersupplyService'

export function usePowersupplies() {
  const powersupplies = ref<any[]>([])
  const selectedPowersupply = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPowersupplies() {
    loading.value = true
    error.value = null

    try {
      powersupplies.value = await getPowersupplies()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPowersupplyById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPowersupply.value = await getPowersupplyById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    powersupplies,
    selectedPowersupply,
    loading,
    error,
    loadPowersupplies,
    loadPowersupplyById,
  }
}
