// Auto-generated file. Do not edit manually.
// Composable generated from computerService.ts.

import { ref } from 'vue'
import { getComputers, getComputerById } from '@/services/generated/computerService'
import type { Computer } from '@/services/generated/computerService'

export function useComputers() {
  const computers = ref<Computer[]>([])
  const selectedComputer = ref<Computer | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadComputers() {
    loading.value = true
    error.value = null

    try {
      computers.value = await getComputers()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadComputerById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedComputer.value = await getComputerById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    computers,
    selectedComputer,
    loading,
    error,
    loadComputers,
    loadComputerById,
  }
}
