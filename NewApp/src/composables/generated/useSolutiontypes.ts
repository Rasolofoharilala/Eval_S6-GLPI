// Auto-generated file. Do not edit manually.
// Composable generated from solutiontypeService.ts.

import { ref } from 'vue'
import { getSolutiontypes, getSolutiontypeById } from '@/services/generated/solutiontypeService'
import type { SolutionType } from '@/services/generated/solutiontypeService'

export function useSolutiontypes() {
  const solutiontypes = ref<SolutionType[]>([])
  const selectedSolutiontype = ref<SolutionType | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadSolutiontypes() {
    loading.value = true
    error.value = null

    try {
      solutiontypes.value = await getSolutiontypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadSolutiontypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedSolutiontype.value = await getSolutiontypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    solutiontypes,
    selectedSolutiontype,
    loading,
    error,
    loadSolutiontypes,
    loadSolutiontypeById,
  }
}
