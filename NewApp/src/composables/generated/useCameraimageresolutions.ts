// Auto-generated file. Do not edit manually.
// Composable generated from cameraimageresolutionService.ts.

import { ref } from 'vue'
import {
  getCameraimageresolutions,
  getCameraimageresolutionById,
} from '@/services/generated/cameraimageresolutionService'
import type { CameraImageResolution } from '@/services/generated/cameraimageresolutionService'

export function useCameraimageresolutions() {
  const cameraimageresolutions = ref<CameraImageResolution[]>([])
  const selectedCameraimageresolution = ref<CameraImageResolution | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCameraimageresolutions() {
    loading.value = true
    error.value = null

    try {
      cameraimageresolutions.value = await getCameraimageresolutions()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadCameraimageresolutionById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedCameraimageresolution.value = await getCameraimageresolutionById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    cameraimageresolutions,
    selectedCameraimageresolution,
    loading,
    error,
    loadCameraimageresolutions,
    loadCameraimageresolutionById,
  }
}
