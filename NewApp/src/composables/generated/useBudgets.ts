// Auto-generated file. Do not edit manually.
// Composable generated from budgetService.ts.

import { ref } from 'vue'
import { getBudgets, getBudgetById } from '@/services/generated/budgetService'

export function useBudgets() {
  const budgets = ref<any[]>([])
  const selectedBudget = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadBudgets() {
    loading.value = true
    error.value = null

    try {
      budgets.value = await getBudgets()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadBudgetById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedBudget.value = await getBudgetById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    budgets,
    selectedBudget,
    loading,
    error,
    loadBudgets,
    loadBudgetById,
  }
}
