// Auto-generated file. Do not edit manually.
// Composable generated from contractService.ts.

import { ref } from 'vue'
import { getContracts, getContractById } from '@/services/generated/contractService'

export function useContracts() {
  const contracts = ref<any[]>([])
  const selectedContract = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadContracts() {
    loading.value = true
    error.value = null

    try {
      contracts.value = await getContracts()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadContractById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedContract.value = await getContractById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    contracts,
    selectedContract,
    loading,
    error,
    loadContracts,
    loadContractById,
  }
}
