// Auto-generated file. Do not edit manually.
// Composable generated from manufacturerService.ts.

import { ref } from 'vue'
import { getManufacturers, getManufacturerById } from '@/services/generated/manufacturerService'

export function useManufacturers() {
  const manufacturers = ref<any[]>([])
  const selectedManufacturer = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadManufacturers() {
    loading.value = true
    error.value = null

    try {
      manufacturers.value = await getManufacturers()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadManufacturerById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedManufacturer.value = await getManufacturerById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    manufacturers,
    selectedManufacturer,
    loading,
    error,
    loadManufacturers,
    loadManufacturerById,
  }
}
