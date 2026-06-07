// Auto-generated file. Do not edit manually.
// Composable generated from olaService.ts.

import { ref } from 'vue'
import { getOlas, getOlaById } from '@/services/generated/olaService'
import type { OLA } from '@/services/generated/olaService'

export function useOlas() {
  const olas = ref<OLA[]>([])
  const selectedOla = ref<OLA | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadOlas() {
    loading.value = true
    error.value = null

    try {
      olas.value = await getOlas()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadOlaById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedOla.value = await getOlaById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    olas,
    selectedOla,
    loading,
    error,
    loadOlas,
    loadOlaById,
  }
}
