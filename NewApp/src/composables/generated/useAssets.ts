// Auto-generated file. Do not edit manually.
// Composable generated from assetService.ts.

import { ref } from 'vue'
import { getAssets } from '@/services/generated/assetService'

export function useAssets() {
  const assets = ref<any[]>([])
  const selectedAsset = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadAssets() {
    loading.value = true
    error.value = null

    try {
      assets.value = await getAssets()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    assets,
    selectedAsset,
    loading,
    error,
    loadAssets,
  }
}
