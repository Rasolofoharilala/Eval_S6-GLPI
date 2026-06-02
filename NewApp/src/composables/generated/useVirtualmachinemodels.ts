// Auto-generated file. Do not edit manually.
// Composable generated from virtualmachinemodelService.ts.

import { ref } from 'vue'
import { getVirtualmachinemodels, getVirtualmachinemodelById } from '@/services/generated/virtualmachinemodelService'

export function useVirtualmachinemodels() {
  const virtualmachinemodels = ref<any[]>([])
  const selectedVirtualmachinemodel = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadVirtualmachinemodels() {
    loading.value = true
    error.value = null

    try {
      virtualmachinemodels.value = await getVirtualmachinemodels()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadVirtualmachinemodelById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedVirtualmachinemodel.value = await getVirtualmachinemodelById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    virtualmachinemodels,
    selectedVirtualmachinemodel,
    loading,
    error,
    loadVirtualmachinemodels,
    loadVirtualmachinemodelById,
  }
}
