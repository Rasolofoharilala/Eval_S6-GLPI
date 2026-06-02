// Auto-generated file. Do not edit manually.
// Composable generated from slalevelService.ts.

import { ref } from 'vue'
import { getSlalevels, getSlalevelById } from '@/services/generated/slalevelService'

export function useSlalevels() {
  const slalevels = ref<any[]>([])
  const selectedSlalevel = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadSlalevels() {
    loading.value = true
    error.value = null

    try {
      slalevels.value = await getSlalevels()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadSlalevelById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedSlalevel.value = await getSlalevelById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    slalevels,
    selectedSlalevel,
    loading,
    error,
    loadSlalevels,
    loadSlalevelById,
  }
}
