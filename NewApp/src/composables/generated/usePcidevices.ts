// Auto-generated file. Do not edit manually.
// Composable generated from pcideviceService.ts.

import { ref } from 'vue'
import { getPcidevices, getPcideviceById } from '@/services/generated/pcideviceService'

export function usePcidevices() {
  const pcidevices = ref<any[]>([])
  const selectedPcidevice = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPcidevices() {
    loading.value = true
    error.value = null

    try {
      pcidevices.value = await getPcidevices()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPcideviceById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPcidevice.value = await getPcideviceById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    pcidevices,
    selectedPcidevice,
    loading,
    error,
    loadPcidevices,
    loadPcideviceById,
  }
}
