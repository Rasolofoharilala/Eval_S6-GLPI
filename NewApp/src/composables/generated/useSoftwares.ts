// Auto-generated file. Do not edit manually.
// Composable generated from softwareService.ts.

import { ref } from 'vue'
import { getSoftwares, getSoftwareById } from '@/services/generated/softwareService'
import type { Software } from '@/services/generated/softwareService'

export function useSoftwares() {
  const softwares = ref<Software[]>([])
  const selectedSoftware = ref<Software | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadSoftwares() {
    loading.value = true
    error.value = null

    try {
      softwares.value = await getSoftwares()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadSoftwareById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedSoftware.value = await getSoftwareById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    softwares,
    selectedSoftware,
    loading,
    error,
    loadSoftwares,
    loadSoftwareById,
  }
}
