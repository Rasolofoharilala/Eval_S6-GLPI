// Auto-generated file. Do not edit manually.
// Composable generated from statService.ts.

import { ref } from 'vue'
import { getStats } from '@/services/generated/statService'

export function useStats() {
  const stats = ref<any[]>([])
  const selectedStat = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadStats() {
    loading.value = true
    error.value = null

    try {
      stats.value = await getStats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    stats,
    selectedStat,
    loading,
    error,
    loadStats,
  }
}
