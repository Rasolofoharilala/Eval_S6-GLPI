// Auto-generated file. Do not edit manually.
// Composable generated from problemService.ts.

import { ref } from 'vue'
import { getProblems, getProblemById } from '@/services/generated/problemService'

export function useProblems() {
  const problems = ref<any[]>([])
  const selectedProblem = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadProblems() {
    loading.value = true
    error.value = null

    try {
      problems.value = await getProblems()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadProblemById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedProblem.value = await getProblemById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    problems,
    selectedProblem,
    loading,
    error,
    loadProblems,
    loadProblemById,
  }
}
