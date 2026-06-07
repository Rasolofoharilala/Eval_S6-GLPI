// Auto-generated file. Do not edit manually.
// Composable generated from networkporttypeService.ts.

import { ref } from 'vue'
import {
  getNetworkporttypes,
  getNetworkporttypeById,
} from '@/services/generated/networkporttypeService'

export function useNetworkporttypes() {
  const networkporttypes = ref<any[]>([])
  const selectedNetworkporttype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadNetworkporttypes() {
    loading.value = true
    error.value = null

    try {
      networkporttypes.value = await getNetworkporttypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadNetworkporttypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedNetworkporttype.value = await getNetworkporttypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    networkporttypes,
    selectedNetworkporttype,
    loading,
    error,
    loadNetworkporttypes,
    loadNetworkporttypeById,
  }
}
