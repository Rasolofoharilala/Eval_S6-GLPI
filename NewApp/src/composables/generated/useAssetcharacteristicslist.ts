// Auto-generated file. Do not edit manually.
// Composable generated from assetcharacteristicsService.ts.

import { ref } from 'vue'
import { getAssetcharacteristicslist } from '@/services/generated/assetcharacteristicsService'
import type { AssetCharacteristicsStats } from '@/services/generated/assetcharacteristicsService'

export function useAssetcharacteristicslist() {
  const assetcharacteristicslist = ref<AssetCharacteristicsStats[]>([])
  const selectedAssetcharacteristics = ref<AssetCharacteristicsStats | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadAssetcharacteristicslist() {
    loading.value = true
    error.value = null

    try {
      assetcharacteristicslist.value = await getAssetcharacteristicslist()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    assetcharacteristicslist,
    selectedAssetcharacteristics,
    loading,
    error,
    loadAssetcharacteristicslist,
  }
}
