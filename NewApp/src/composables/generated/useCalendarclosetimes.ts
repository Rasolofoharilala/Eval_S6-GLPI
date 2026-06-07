// Auto-generated file. Do not edit manually.
// Composable generated from calendarclosetimeService.ts.

import { ref } from 'vue'
import {
  getCalendarclosetimes,
  getCalendarclosetimeById,
} from '@/services/generated/calendarclosetimeService'

export function useCalendarclosetimes() {
  const calendarclosetimes = ref<any[]>([])
  const selectedCalendarclosetime = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCalendarclosetimes() {
    loading.value = true
    error.value = null

    try {
      calendarclosetimes.value = await getCalendarclosetimes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadCalendarclosetimeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedCalendarclosetime.value = await getCalendarclosetimeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    calendarclosetimes,
    selectedCalendarclosetime,
    loading,
    error,
    loadCalendarclosetimes,
    loadCalendarclosetimeById,
  }
}
