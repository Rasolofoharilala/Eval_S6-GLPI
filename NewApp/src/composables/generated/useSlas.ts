// Auto-generated file. Do not edit manually.
// Composable generated from slaService.ts.

import { ref } from 'vue'
import { getSlas, getSlaById } from '@/services/generated/slaService'

export function useSlas() {
  const slas = ref<any[]>([])
  const selectedSla = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadSlas() {
    loading.value = true
    error.value = null

    try {
      slas.value = await getSlas()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadSlaById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedSla.value = await getSlaById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    slas,
    selectedSla,
    loading,
    error,
    loadSlas,
    loadSlaById,
  }
}
