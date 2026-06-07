// Auto-generated file. Do not edit manually.
// Composable generated from solutiontemplateService.ts.

import { ref } from 'vue'
import {
  getSolutiontemplates,
  getSolutiontemplateById,
} from '@/services/generated/solutiontemplateService'

export function useSolutiontemplates() {
  const solutiontemplates = ref<any[]>([])
  const selectedSolutiontemplate = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadSolutiontemplates() {
    loading.value = true
    error.value = null

    try {
      solutiontemplates.value = await getSolutiontemplates()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadSolutiontemplateById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedSolutiontemplate.value = await getSolutiontemplateById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    solutiontemplates,
    selectedSolutiontemplate,
    loading,
    error,
    loadSolutiontemplates,
    loadSolutiontemplateById,
  }
}
