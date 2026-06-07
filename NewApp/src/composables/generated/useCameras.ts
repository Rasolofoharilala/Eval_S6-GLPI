// Auto-generated file. Do not edit manually.
// Composable generated from cameraService.ts.

import { ref } from 'vue'
import { getCameras, getCameraById } from '@/services/generated/cameraService'
import type { Camera } from '@/services/generated/cameraService'

export function useCameras() {
  const cameras = ref<Camera[]>([])
  const selectedCamera = ref<Camera | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCameras() {
    loading.value = true
    error.value = null

    try {
      cameras.value = await getCameras()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadCameraById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedCamera.value = await getCameraById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    cameras,
    selectedCamera,
    loading,
    error,
    loadCameras,
    loadCameraById,
  }
}
