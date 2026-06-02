// Auto-generated file. Do not edit manually.
// Composable generated from closetimeService.ts.

import { ref } from 'vue'
import { getClosetimes, getClosetimeById } from '@/services/generated/closetimeService'

export function useClosetimes() {
  const closetimes = ref<any[]>([])
  const selectedClosetime = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadClosetimes() {
    loading.value = true
    error.value = null

    try {
      closetimes.value = await getClosetimes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadClosetimeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedClosetime.value = await getClosetimeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    closetimes,
    selectedClosetime,
    loading,
    error,
    loadClosetimes,
    loadClosetimeById,
  }
}
