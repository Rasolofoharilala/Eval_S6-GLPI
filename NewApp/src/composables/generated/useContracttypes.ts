// Auto-generated file. Do not edit manually.
// Composable generated from contracttypeService.ts.

import { ref } from 'vue'
import { getContracttypes, getContracttypeById } from '@/services/generated/contracttypeService'

export function useContracttypes() {
  const contracttypes = ref<any[]>([])
  const selectedContracttype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadContracttypes() {
    loading.value = true
    error.value = null

    try {
      contracttypes.value = await getContracttypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadContracttypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedContracttype.value = await getContracttypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    contracttypes,
    selectedContracttype,
    loading,
    error,
    loadContracttypes,
    loadContracttypeById,
  }
}
