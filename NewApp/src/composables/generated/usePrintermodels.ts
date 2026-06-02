// Auto-generated file. Do not edit manually.
// Composable generated from printermodelService.ts.

import { ref } from 'vue'
import { getPrintermodels, getPrintermodelById } from '@/services/generated/printermodelService'

export function usePrintermodels() {
  const printermodels = ref<any[]>([])
  const selectedPrintermodel = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPrintermodels() {
    loading.value = true
    error.value = null

    try {
      printermodels.value = await getPrintermodels()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPrintermodelById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPrintermodel.value = await getPrintermodelById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    printermodels,
    selectedPrintermodel,
    loading,
    error,
    loadPrintermodels,
    loadPrintermodelById,
  }
}
