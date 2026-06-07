// Auto-generated file. Do not edit manually.
// Composable generated from usbvendorService.ts.

import { ref } from 'vue'
import { getUsbvendors, getUsbvendorById } from '@/services/generated/usbvendorService'
import type { USBVendor } from '@/services/generated/usbvendorService'

export function useUsbvendors() {
  const usbvendors = ref<USBVendor[]>([])
  const selectedUsbvendor = ref<USBVendor | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadUsbvendors() {
    loading.value = true
    error.value = null

    try {
      usbvendors.value = await getUsbvendors()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadUsbvendorById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedUsbvendor.value = await getUsbvendorById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    usbvendors,
    selectedUsbvendor,
    loading,
    error,
    loadUsbvendors,
    loadUsbvendorById,
  }
}
