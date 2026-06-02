// Auto-generated file. Do not edit manually.
// Composable generated from businesscriticityService.ts.

import { ref } from 'vue'
import { getBusinesscriticities, getBusinesscriticityById } from '@/services/generated/businesscriticityService'

export function useBusinesscriticities() {
  const businesscriticities = ref<any[]>([])
  const selectedBusinesscriticity = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadBusinesscriticities() {
    loading.value = true
    error.value = null

    try {
      businesscriticities.value = await getBusinesscriticities()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadBusinesscriticityById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedBusinesscriticity.value = await getBusinesscriticityById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    businesscriticities,
    selectedBusinesscriticity,
    loading,
    error,
    loadBusinesscriticities,
    loadBusinesscriticityById,
  }
}
