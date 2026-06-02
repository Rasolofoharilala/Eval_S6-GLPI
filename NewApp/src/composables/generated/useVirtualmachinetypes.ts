// Auto-generated file. Do not edit manually.
// Composable generated from virtualmachinetypeService.ts.

import { ref } from 'vue'
import { getVirtualmachinetypes, getVirtualmachinetypeById } from '@/services/generated/virtualmachinetypeService'

export function useVirtualmachinetypes() {
  const virtualmachinetypes = ref<any[]>([])
  const selectedVirtualmachinetype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadVirtualmachinetypes() {
    loading.value = true
    error.value = null

    try {
      virtualmachinetypes.value = await getVirtualmachinetypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadVirtualmachinetypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedVirtualmachinetype.value = await getVirtualmachinetypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    virtualmachinetypes,
    selectedVirtualmachinetype,
    loading,
    error,
    loadVirtualmachinetypes,
    loadVirtualmachinetypeById,
  }
}
