// Auto-generated file. Do not edit manually.
// Composable generated from budgettypeService.ts.

import { ref } from 'vue'
import { getBudgettypes, getBudgettypeById } from '@/services/generated/budgettypeService'
import type { BudgetType } from '@/services/generated/budgettypeService'

export function useBudgettypes() {
  const budgettypes = ref<BudgetType[]>([])
  const selectedBudgettype = ref<BudgetType | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadBudgettypes() {
    loading.value = true
    error.value = null

    try {
      budgettypes.value = await getBudgettypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadBudgettypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedBudgettype.value = await getBudgettypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    budgettypes,
    selectedBudgettype,
    loading,
    error,
    loadBudgettypes,
    loadBudgettypeById,
  }
}
