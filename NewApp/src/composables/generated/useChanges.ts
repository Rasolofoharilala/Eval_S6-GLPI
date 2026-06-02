// Auto-generated file. Do not edit manually.
// Composable generated from changeService.ts.

import { ref } from 'vue'
import { getChanges, getChangeById } from '@/services/generated/changeService'

export function useChanges() {
  const changes = ref<any[]>([])
  const selectedChange = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadChanges() {
    loading.value = true
    error.value = null

    try {
      changes.value = await getChanges()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadChangeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedChange.value = await getChangeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    changes,
    selectedChange,
    loading,
    error,
    loadChanges,
    loadChangeById,
  }
}
