// Auto-generated file. Do not edit manually.
// Composable generated from criteriaconditionService.ts.

import { ref } from 'vue'
import { getCriteriaconditions } from '@/services/generated/criteriaconditionService'
import type { RuleCriteriaCondition } from '@/services/generated/criteriaconditionService'

export function useCriteriaconditions() {
  const criteriaconditions = ref<RuleCriteriaCondition[]>([])
  const selectedCriteriacondition = ref<RuleCriteriaCondition | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCriteriaconditions() {
    loading.value = true
    error.value = null

    try {
      criteriaconditions.value = await getCriteriaconditions()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    criteriaconditions,
    selectedCriteriacondition,
    loading,
    error,
    loadCriteriaconditions,
  }
}
