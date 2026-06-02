// Auto-generated file. Do not edit manually.
// Composable generated from computertypeService.ts.

import { ref } from 'vue'
import { getComputertypes, getComputertypeById } from '@/services/generated/computertypeService'

export function useComputertypes() {
  const computertypes = ref<any[]>([])
  const selectedComputertype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadComputertypes() {
    loading.value = true
    error.value = null

    try {
      computertypes.value = await getComputertypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadComputertypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedComputertype.value = await getComputertypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    computertypes,
    selectedComputertype,
    loading,
    error,
    loadComputertypes,
    loadComputertypeById,
  }
}
