// Auto-generated file. Do not edit manually.
// Composable generated from printerService.ts.

import { ref } from 'vue'
import { getPrinters, getPrinterById } from '@/services/generated/printerService'
import type { Printer } from '@/services/generated/printerService'

export function usePrinters() {
  const printers = ref<Printer[]>([])
  const selectedPrinter = ref<Printer | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPrinters() {
    loading.value = true
    error.value = null

    try {
      printers.value = await getPrinters()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPrinterById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPrinter.value = await getPrinterById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    printers,
    selectedPrinter,
    loading,
    error,
    loadPrinters,
    loadPrinterById,
  }
}
