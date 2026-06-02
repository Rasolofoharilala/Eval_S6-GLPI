// Auto-generated file. Do not edit manually.
// Composable generated from networkequipmentmodelService.ts.

import { ref } from 'vue'
import { getNetworkequipmentmodels, getNetworkequipmentmodelById } from '@/services/generated/networkequipmentmodelService'

export function useNetworkequipmentmodels() {
  const networkequipmentmodels = ref<any[]>([])
  const selectedNetworkequipmentmodel = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadNetworkequipmentmodels() {
    loading.value = true
    error.value = null

    try {
      networkequipmentmodels.value = await getNetworkequipmentmodels()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadNetworkequipmentmodelById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedNetworkequipmentmodel.value = await getNetworkequipmentmodelById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    networkequipmentmodels,
    selectedNetworkequipmentmodel,
    loading,
    error,
    loadNetworkequipmentmodels,
    loadNetworkequipmentmodelById,
  }
}
