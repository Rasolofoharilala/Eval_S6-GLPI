// Auto-generated file. Do not edit manually.
// Composable generated from cameraimageformatService.ts.

import { ref } from 'vue'
import {
  getCameraimageformats,
  getCameraimageformatById,
} from '@/services/generated/cameraimageformatService'

export function useCameraimageformats() {
  const cameraimageformats = ref<any[]>([])
  const selectedCameraimageformat = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCameraimageformats() {
    loading.value = true
    error.value = null

    try {
      cameraimageformats.value = await getCameraimageformats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadCameraimageformatById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedCameraimageformat.value = await getCameraimageformatById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    cameraimageformats,
    selectedCameraimageformat,
    loading,
    error,
    loadCameraimageformats,
    loadCameraimageformatById,
  }
}
