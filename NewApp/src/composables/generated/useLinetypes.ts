// Auto-generated file. Do not edit manually.
// Composable generated from linetypeService.ts.

import { ref } from 'vue'
import { getLinetypes, getLinetypeById } from '@/services/generated/linetypeService'

export function useLinetypes() {
  const linetypes = ref<any[]>([])
  const selectedLinetype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadLinetypes() {
    loading.value = true
    error.value = null

    try {
      linetypes.value = await getLinetypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadLinetypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedLinetype.value = await getLinetypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    linetypes,
    selectedLinetype,
    loading,
    error,
    loadLinetypes,
    loadLinetypeById,
  }
}
