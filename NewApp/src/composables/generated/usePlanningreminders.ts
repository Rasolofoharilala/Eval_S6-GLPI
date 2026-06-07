// Auto-generated file. Do not edit manually.
// Composable generated from planningreminderService.ts.

import { ref } from 'vue'
import {
  getPlanningreminders,
  getPlanningreminderById,
} from '@/services/generated/planningreminderService'

export function usePlanningreminders() {
  const planningreminders = ref<any[]>([])
  const selectedPlanningreminder = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPlanningreminders() {
    loading.value = true
    error.value = null

    try {
      planningreminders.value = await getPlanningreminders()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPlanningreminderById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPlanningreminder.value = await getPlanningreminderById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    planningreminders,
    selectedPlanningreminder,
    loading,
    error,
    loadPlanningreminders,
    loadPlanningreminderById,
  }
}
