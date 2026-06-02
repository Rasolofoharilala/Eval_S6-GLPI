// Auto-generated file. Do not edit manually.
// Composable generated from olalevelService.ts.

import { ref } from 'vue'
import { getOlalevels, getOlalevelById } from '@/services/generated/olalevelService'

export function useOlalevels() {
  const olalevels = ref<any[]>([])
  const selectedOlalevel = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadOlalevels() {
    loading.value = true
    error.value = null

    try {
      olalevels.value = await getOlalevels()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadOlalevelById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedOlalevel.value = await getOlalevelById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    olalevels,
    selectedOlalevel,
    loading,
    error,
    loadOlalevels,
    loadOlalevelById,
  }
}
