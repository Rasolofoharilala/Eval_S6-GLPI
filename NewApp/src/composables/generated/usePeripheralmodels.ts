// Auto-generated file. Do not edit manually.
// Composable generated from peripheralmodelService.ts.

import { ref } from 'vue'
import {
  getPeripheralmodels,
  getPeripheralmodelById,
} from '@/services/generated/peripheralmodelService'
import type { PeripheralModel } from '@/services/generated/peripheralmodelService'

export function usePeripheralmodels() {
  const peripheralmodels = ref<PeripheralModel[]>([])
  const selectedPeripheralmodel = ref<PeripheralModel | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPeripheralmodels() {
    loading.value = true
    error.value = null

    try {
      peripheralmodels.value = await getPeripheralmodels()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPeripheralmodelById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPeripheralmodel.value = await getPeripheralmodelById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    peripheralmodels,
    selectedPeripheralmodel,
    loading,
    error,
    loadPeripheralmodels,
    loadPeripheralmodelById,
  }
}
