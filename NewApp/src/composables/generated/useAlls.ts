// Auto-generated file. Do not edit manually.
// Composable generated from allService.ts.

import { ref } from 'vue'
import { getAlls } from '@/services/generated/allService'

export function useAlls() {
  const alls = ref<unknown[]>([])
  const selectedAll = ref<unknown | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadAlls() {
    loading.value = true
    error.value = null

    try {
      alls.value = await getAlls()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    alls,
    selectedAll,
    loading,
    error,
    loadAlls,
  }
}
