// Auto-generated file. Do not edit manually.
// Composable generated from computermodelService.ts.

import { ref } from 'vue'
import { getComputermodels, getComputermodelById } from '@/services/generated/computermodelService'
import type { ComputerModel } from '@/services/generated/computermodelService'

export function useComputermodels() {
  const computermodels = ref<ComputerModel[]>([])
  const selectedComputermodel = ref<ComputerModel | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadComputermodels() {
    loading.value = true
    error.value = null

    try {
      computermodels.value = await getComputermodels()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadComputermodelById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedComputermodel.value = await getComputermodelById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    computermodels,
    selectedComputermodel,
    loading,
    error,
    loadComputermodels,
    loadComputermodelById,
  }
}
