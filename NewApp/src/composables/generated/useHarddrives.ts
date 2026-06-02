// Auto-generated file. Do not edit manually.
// Composable generated from harddriveService.ts.

import { ref } from 'vue'
import { getHarddrives, getHarddriveById } from '@/services/generated/harddriveService'

export function useHarddrives() {
  const harddrives = ref<any[]>([])
  const selectedHarddrive = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadHarddrives() {
    loading.value = true
    error.value = null

    try {
      harddrives.value = await getHarddrives()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadHarddriveById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedHarddrive.value = await getHarddriveById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    harddrives,
    selectedHarddrive,
    loading,
    error,
    loadHarddrives,
    loadHarddriveById,
  }
}
