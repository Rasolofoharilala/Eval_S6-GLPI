// Auto-generated file. Do not edit manually.
// Composable generated from characteristicsService.ts.

import { ref } from 'vue'
import { getCharacteristicslist } from '@/services/generated/characteristicsService'
import type { ITILStats } from '@/services/generated/characteristicsService'

export function useCharacteristicslist() {
  const characteristicslist = ref<ITILStats[]>([])
  const selectedCharacteristics = ref<ITILStats | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCharacteristicslist() {
    loading.value = true
    error.value = null

    try {
      characteristicslist.value = await getCharacteristicslist()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    characteristicslist,
    selectedCharacteristics,
    loading,
    error,
    loadCharacteristicslist,
  }
}
