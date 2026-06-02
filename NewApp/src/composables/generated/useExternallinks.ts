// Auto-generated file. Do not edit manually.
// Composable generated from externallinkService.ts.

import { ref } from 'vue'
import { getExternallinks, getExternallinkById } from '@/services/generated/externallinkService'

export function useExternallinks() {
  const externallinks = ref<any[]>([])
  const selectedExternallink = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadExternallinks() {
    loading.value = true
    error.value = null

    try {
      externallinks.value = await getExternallinks()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadExternallinkById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedExternallink.value = await getExternallinkById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    externallinks,
    selectedExternallink,
    loading,
    error,
    loadExternallinks,
    loadExternallinkById,
  }
}
