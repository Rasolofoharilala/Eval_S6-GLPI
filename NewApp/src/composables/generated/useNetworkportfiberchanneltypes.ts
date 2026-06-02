// Auto-generated file. Do not edit manually.
// Composable generated from networkportfiberchanneltypeService.ts.

import { ref } from 'vue'
import { getNetworkportfiberchanneltypes, getNetworkportfiberchanneltypeById } from '@/services/generated/networkportfiberchanneltypeService'

export function useNetworkportfiberchanneltypes() {
  const networkportfiberchanneltypes = ref<any[]>([])
  const selectedNetworkportfiberchanneltype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadNetworkportfiberchanneltypes() {
    loading.value = true
    error.value = null

    try {
      networkportfiberchanneltypes.value = await getNetworkportfiberchanneltypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadNetworkportfiberchanneltypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedNetworkportfiberchanneltype.value = await getNetworkportfiberchanneltypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    networkportfiberchanneltypes,
    selectedNetworkportfiberchanneltype,
    loading,
    error,
    loadNetworkportfiberchanneltypes,
    loadNetworkportfiberchanneltypeById,
  }
}
