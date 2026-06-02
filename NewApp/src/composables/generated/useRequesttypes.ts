// Auto-generated file. Do not edit manually.
// Composable generated from requesttypeService.ts.

import { ref } from 'vue'
import { getRequesttypes, getRequesttypeById } from '@/services/generated/requesttypeService'

export function useRequesttypes() {
  const requesttypes = ref<any[]>([])
  const selectedRequesttype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadRequesttypes() {
    loading.value = true
    error.value = null

    try {
      requesttypes.value = await getRequesttypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadRequesttypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedRequesttype.value = await getRequesttypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    requesttypes,
    selectedRequesttype,
    loading,
    error,
    loadRequesttypes,
    loadRequesttypeById,
  }
}
