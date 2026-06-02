// Auto-generated file. Do not edit manually.
// Composable generated from genericdeviceService.ts.

import { ref } from 'vue'
import { getGenericdevices, getGenericdeviceById } from '@/services/generated/genericdeviceService'

export function useGenericdevices() {
  const genericdevices = ref<any[]>([])
  const selectedGenericdevice = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadGenericdevices() {
    loading.value = true
    error.value = null

    try {
      genericdevices.value = await getGenericdevices()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadGenericdeviceById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedGenericdevice.value = await getGenericdeviceById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    genericdevices,
    selectedGenericdevice,
    loading,
    error,
    loadGenericdevices,
    loadGenericdeviceById,
  }
}
