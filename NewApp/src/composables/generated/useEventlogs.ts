// Auto-generated file. Do not edit manually.
// Composable generated from eventlogService.ts.

import { ref } from 'vue'
import { getEventlogs, getEventlogById } from '@/services/generated/eventlogService'

export function useEventlogs() {
  const eventlogs = ref<any[]>([])
  const selectedEventlog = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadEventlogs() {
    loading.value = true
    error.value = null

    try {
      eventlogs.value = await getEventlogs()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadEventlogById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedEventlog.value = await getEventlogById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    eventlogs,
    selectedEventlog,
    loading,
    error,
    loadEventlogs,
    loadEventlogById,
  }
}
