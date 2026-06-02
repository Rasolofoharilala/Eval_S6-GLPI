// Auto-generated file. Do not edit manually.
// Composable generated from projecttasktypeService.ts.

import { ref } from 'vue'
import { getProjecttasktypes, getProjecttasktypeById } from '@/services/generated/projecttasktypeService'

export function useProjecttasktypes() {
  const projecttasktypes = ref<any[]>([])
  const selectedProjecttasktype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadProjecttasktypes() {
    loading.value = true
    error.value = null

    try {
      projecttasktypes.value = await getProjecttasktypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadProjecttasktypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedProjecttasktype.value = await getProjecttasktypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    projecttasktypes,
    selectedProjecttasktype,
    loading,
    error,
    loadProjecttasktypes,
    loadProjecttasktypeById,
  }
}
