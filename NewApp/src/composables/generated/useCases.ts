// Auto-generated file. Do not edit manually.
// Composable generated from caseService.ts.

import { ref } from 'vue'
import { getCases, getCaseById } from '@/services/generated/caseService'
import type { Case } from '@/services/generated/caseService'

export function useCases() {
  const cases = ref<Case[]>([])
  const selectedCase = ref<Case | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCases() {
    loading.value = true
    error.value = null

    try {
      cases.value = await getCases()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadCaseById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedCase.value = await getCaseById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    cases,
    selectedCase,
    loading,
    error,
    loadCases,
    loadCaseById,
  }
}
