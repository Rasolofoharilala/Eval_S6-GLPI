// Auto-generated file. Do not edit manually.
// Composable generated from criteriacriteriaService.ts.

import { ref } from 'vue'
import { getCriteriacriterias } from '@/services/generated/criteriacriteriaService'
import type { RuleCriteriaCriteria } from '@/services/generated/criteriacriteriaService'

export function useCriteriacriterias() {
  const criteriacriterias = ref<RuleCriteriaCriteria[]>([])
  const selectedCriteriacriteria = ref<RuleCriteriaCriteria | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCriteriacriterias() {
    loading.value = true
    error.value = null

    try {
      criteriacriterias.value = await getCriteriacriterias()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    criteriacriterias,
    selectedCriteriacriteria,
    loading,
    error,
    loadCriteriacriterias,
  }
}
