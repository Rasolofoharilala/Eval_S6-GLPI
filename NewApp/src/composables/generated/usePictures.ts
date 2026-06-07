// Auto-generated file. Do not edit manually.
// Composable generated from pictureService.ts.

import { ref } from 'vue'
import { getPictures } from '@/services/generated/pictureService'

export function usePictures() {
  const pictures = ref<unknown[]>([])
  const selectedPicture = ref<unknown | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPictures() {
    loading.value = true
    error.value = null

    try {
      pictures.value = await getPictures()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    pictures,
    selectedPicture,
    loading,
    error,
    loadPictures,
  }
}
