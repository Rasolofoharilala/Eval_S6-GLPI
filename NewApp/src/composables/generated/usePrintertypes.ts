// Auto-generated file. Do not edit manually.
// Composable generated from printertypeService.ts.

import { ref } from 'vue'
import { getPrintertypes, getPrintertypeById } from '@/services/generated/printertypeService'
import type { PrinterType } from '@/services/generated/printertypeService'

export function usePrintertypes() {
  const printertypes = ref<PrinterType[]>([])
  const selectedPrintertype = ref<PrinterType | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPrintertypes() {
    loading.value = true
    error.value = null

    try {
      printertypes.value = await getPrintertypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPrintertypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPrintertype.value = await getPrintertypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    printertypes,
    selectedPrintertype,
    loading,
    error,
    loadPrintertypes,
    loadPrintertypeById,
  }
}
