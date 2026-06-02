// Auto-generated file. Do not edit manually.
// Composable generated from networkService.ts.

import { ref } from 'vue'
import { getNetworks, getNetworkById } from '@/services/generated/networkService'

export function useNetworks() {
  const networks = ref<any[]>([])
  const selectedNetwork = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadNetworks() {
    loading.value = true
    error.value = null

    try {
      networks.value = await getNetworks()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadNetworkById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedNetwork.value = await getNetworkById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    networks,
    selectedNetwork,
    loading,
    error,
    loadNetworks,
    loadNetworkById,
  }
}
