// Auto-generated file. Do not edit manually.
// Composable generated from locationService.ts.

import { ref } from 'vue'
import { getLocations, getLocationById } from '@/services/generated/locationService'
import type { Location } from '@/services/generated/locationService'

export function useLocations() {
  const locations = ref<Location[]>([])
  const selectedLocation = ref<Location | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadLocations() {
    loading.value = true
    error.value = null

    try {
      locations.value = await getLocations()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadLocationById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedLocation.value = await getLocationById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    locations,
    selectedLocation,
    loading,
    error,
    loadLocations,
    loadLocationById,
  }
}
