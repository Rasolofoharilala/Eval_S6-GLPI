// Auto-generated file. Do not edit manually.
// Composable generated from wifinetworkService.ts.

import { ref } from 'vue'
import { getWifinetworks, getWifinetworkById } from '@/services/generated/wifinetworkService'

export function useWifinetworks() {
  const wifinetworks = ref<any[]>([])
  const selectedWifinetwork = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadWifinetworks() {
    loading.value = true
    error.value = null

    try {
      wifinetworks.value = await getWifinetworks()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadWifinetworkById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedWifinetwork.value = await getWifinetworkById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    wifinetworks,
    selectedWifinetwork,
    loading,
    error,
    loadWifinetworks,
    loadWifinetworkById,
  }
}
