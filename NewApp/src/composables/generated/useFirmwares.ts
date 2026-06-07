// Auto-generated file. Do not edit manually.
// Composable generated from firmwareService.ts.

import { ref } from 'vue'
import { getFirmwares, getFirmwareById } from '@/services/generated/firmwareService'
import type { Firmware } from '@/services/generated/firmwareService'

export function useFirmwares() {
  const firmwares = ref<Firmware[]>([])
  const selectedFirmware = ref<Firmware | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadFirmwares() {
    loading.value = true
    error.value = null

    try {
      firmwares.value = await getFirmwares()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadFirmwareById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedFirmware.value = await getFirmwareById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    firmwares,
    selectedFirmware,
    loading,
    error,
    loadFirmwares,
    loadFirmwareById,
  }
}
