// Auto-generated file. Do not edit manually.
// Composable generated from virtualmachinestateService.ts.

import { ref } from 'vue'
import { getVirtualmachinestates, getVirtualmachinestateById } from '@/services/generated/virtualmachinestateService'

export function useVirtualmachinestates() {
  const virtualmachinestates = ref<any[]>([])
  const selectedVirtualmachinestate = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadVirtualmachinestates() {
    loading.value = true
    error.value = null

    try {
      virtualmachinestates.value = await getVirtualmachinestates()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadVirtualmachinestateById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedVirtualmachinestate.value = await getVirtualmachinestateById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    virtualmachinestates,
    selectedVirtualmachinestate,
    loading,
    error,
    loadVirtualmachinestates,
    loadVirtualmachinestateById,
  }
}
