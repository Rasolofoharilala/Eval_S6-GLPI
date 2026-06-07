// Auto-generated file. Do not edit manually.
// Composable generated from networkequipmentService.ts.

import { ref } from 'vue'
import {
  getNetworkequipments,
  getNetworkequipmentById,
} from '@/services/generated/networkequipmentService'

export function useNetworkequipments() {
  const networkequipments = ref<any[]>([])
  const selectedNetworkequipment = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadNetworkequipments() {
    loading.value = true
    error.value = null

    try {
      networkequipments.value = await getNetworkequipments()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadNetworkequipmentById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedNetworkequipment.value = await getNetworkequipmentById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    networkequipments,
    selectedNetworkequipment,
    loading,
    error,
    loadNetworkequipments,
    loadNetworkequipmentById,
  }
}
