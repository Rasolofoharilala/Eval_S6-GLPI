// Auto-generated file. Do not edit manually.
// Composable generated from networkequipmenttypeService.ts.

import { ref } from 'vue'
import {
  getNetworkequipmenttypes,
  getNetworkequipmenttypeById,
} from '@/services/generated/networkequipmenttypeService'

export function useNetworkequipmenttypes() {
  const networkequipmenttypes = ref<any[]>([])
  const selectedNetworkequipmenttype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadNetworkequipmenttypes() {
    loading.value = true
    error.value = null

    try {
      networkequipmenttypes.value = await getNetworkequipmenttypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadNetworkequipmenttypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedNetworkequipmenttype.value = await getNetworkequipmenttypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    networkequipmenttypes,
    selectedNetworkequipmenttype,
    loading,
    error,
    loadNetworkequipmenttypes,
    loadNetworkequipmenttypeById,
  }
}
