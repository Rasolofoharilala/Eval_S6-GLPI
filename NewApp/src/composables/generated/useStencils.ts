// Auto-generated file. Do not edit manually.
// Composable generated from stencilService.ts.

import { ref } from 'vue'
import { getStencils, getStencilById } from '@/services/generated/stencilService'
import type { Stencil } from '@/services/generated/stencilService'

export function useStencils() {
  const stencils = ref<Stencil[]>([])
  const selectedStencil = ref<Stencil | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadStencils() {
    loading.value = true
    error.value = null

    try {
      stencils.value = await getStencils()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadStencilById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedStencil.value = await getStencilById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    stencils,
    selectedStencil,
    loading,
    error,
    loadStencils,
    loadStencilById,
  }
}
