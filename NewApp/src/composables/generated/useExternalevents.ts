// Auto-generated file. Do not edit manually.
// Composable generated from externaleventService.ts.

import { ref } from 'vue'
import { getExternalevents, getExternaleventById } from '@/services/generated/externaleventService'

export function useExternalevents() {
  const externalevents = ref<any[]>([])
  const selectedExternalevent = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadExternalevents() {
    loading.value = true
    error.value = null

    try {
      externalevents.value = await getExternalevents()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadExternaleventById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedExternalevent.value = await getExternaleventById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    externalevents,
    selectedExternalevent,
    loading,
    error,
    loadExternalevents,
    loadExternaleventById,
  }
}
