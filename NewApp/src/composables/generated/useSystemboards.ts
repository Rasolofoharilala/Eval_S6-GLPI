// Auto-generated file. Do not edit manually.
// Composable generated from systemboardService.ts.

import { ref } from 'vue'
import { getSystemboards, getSystemboardById } from '@/services/generated/systemboardService'

export function useSystemboards() {
  const systemboards = ref<any[]>([])
  const selectedSystemboard = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadSystemboards() {
    loading.value = true
    error.value = null

    try {
      systemboards.value = await getSystemboards()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadSystemboardById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedSystemboard.value = await getSystemboardById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    systemboards,
    selectedSystemboard,
    loading,
    error,
    loadSystemboards,
    loadSystemboardById,
  }
}
