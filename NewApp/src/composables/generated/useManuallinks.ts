// Auto-generated file. Do not edit manually.
// Composable generated from manuallinkService.ts.

import { ref } from 'vue'
import { getManuallinks, getManuallinkById } from '@/services/generated/manuallinkService'

export function useManuallinks() {
  const manuallinks = ref<any[]>([])
  const selectedManuallink = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadManuallinks() {
    loading.value = true
    error.value = null

    try {
      manuallinks.value = await getManuallinks()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadManuallinkById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedManuallink.value = await getManuallinkById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    manuallinks,
    selectedManuallink,
    loading,
    error,
    loadManuallinks,
    loadManuallinkById,
  }
}
