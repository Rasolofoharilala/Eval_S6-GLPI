// Auto-generated file. Do not edit manually.
// Composable generated from calendartimerangeService.ts.

import { ref } from 'vue'
import { getCalendartimeranges, getCalendartimerangeById } from '@/services/generated/calendartimerangeService'

export function useCalendartimeranges() {
  const calendartimeranges = ref<any[]>([])
  const selectedCalendartimerange = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCalendartimeranges() {
    loading.value = true
    error.value = null

    try {
      calendartimeranges.value = await getCalendartimeranges()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadCalendartimerangeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedCalendartimerange.value = await getCalendartimerangeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    calendartimeranges,
    selectedCalendartimerange,
    loading,
    error,
    loadCalendartimeranges,
    loadCalendartimerangeById,
  }
}
