// Auto-generated file. Do not edit manually.
// Composable generated from tasktemplateService.ts.

import { ref } from 'vue'
import { getTasktemplates, getTasktemplateById } from '@/services/generated/tasktemplateService'
import type { TaskTemplate } from '@/services/generated/tasktemplateService'

export function useTasktemplates() {
  const tasktemplates = ref<TaskTemplate[]>([])
  const selectedTasktemplate = ref<TaskTemplate | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadTasktemplates() {
    loading.value = true
    error.value = null

    try {
      tasktemplates.value = await getTasktemplates()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadTasktemplateById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedTasktemplate.value = await getTasktemplateById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    tasktemplates,
    selectedTasktemplate,
    loading,
    error,
    loadTasktemplates,
    loadTasktemplateById,
  }
}
