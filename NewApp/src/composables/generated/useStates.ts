// Auto-generated file. Do not edit manually.
// Composable generated from stateService.ts.

import { ref } from 'vue'
import { getStates, getStateById } from '@/services/generated/stateService'

export function useStates() {
  const states = ref<any[]>([])
  const selectedState = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadStates() {
    loading.value = true
    error.value = null

    try {
      states.value = await getStates()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadStateById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedState.value = await getStateById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    states,
    selectedState,
    loading,
    error,
    loadStates,
    loadStateById,
  }
}
