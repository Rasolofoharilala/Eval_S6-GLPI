// Auto-generated file. Do not edit manually.
// Composable generated from softwarelicenseService.ts.

import { ref } from 'vue'
import { getSoftwarelicenses, getSoftwarelicenseById } from '@/services/generated/softwarelicenseService'

export function useSoftwarelicenses() {
  const softwarelicenses = ref<any[]>([])
  const selectedSoftwarelicense = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadSoftwarelicenses() {
    loading.value = true
    error.value = null

    try {
      softwarelicenses.value = await getSoftwarelicenses()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadSoftwarelicenseById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedSoftwarelicense.value = await getSoftwarelicenseById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    softwarelicenses,
    selectedSoftwarelicense,
    loading,
    error,
    loadSoftwarelicenses,
    loadSoftwarelicenseById,
  }
}
