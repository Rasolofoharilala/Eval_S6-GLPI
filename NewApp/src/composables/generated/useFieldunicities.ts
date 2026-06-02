// Auto-generated file. Do not edit manually.
// Composable generated from fieldunicityService.ts.

import { ref } from 'vue'
import { getFieldunicities, getFieldunicityById } from '@/services/generated/fieldunicityService'

export function useFieldunicities() {
  const fieldunicities = ref<any[]>([])
  const selectedFieldunicity = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadFieldunicities() {
    loading.value = true
    error.value = null

    try {
      fieldunicities.value = await getFieldunicities()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadFieldunicityById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedFieldunicity.value = await getFieldunicityById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    fieldunicities,
    selectedFieldunicity,
    loading,
    error,
    loadFieldunicities,
    loadFieldunicityById,
  }
}
