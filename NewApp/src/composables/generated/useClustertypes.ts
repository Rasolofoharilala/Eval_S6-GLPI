// Auto-generated file. Do not edit manually.
// Composable generated from clustertypeService.ts.

import { ref } from 'vue'
import { getClustertypes, getClustertypeById } from '@/services/generated/clustertypeService'

export function useClustertypes() {
  const clustertypes = ref<any[]>([])
  const selectedClustertype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadClustertypes() {
    loading.value = true
    error.value = null

    try {
      clustertypes.value = await getClustertypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadClustertypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedClustertype.value = await getClustertypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    clustertypes,
    selectedClustertype,
    loading,
    error,
    loadClustertypes,
    loadClustertypeById,
  }
}
