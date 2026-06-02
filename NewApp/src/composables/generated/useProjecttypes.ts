// Auto-generated file. Do not edit manually.
// Composable generated from projecttypeService.ts.

import { ref } from 'vue'
import { getProjecttypes, getProjecttypeById } from '@/services/generated/projecttypeService'

export function useProjecttypes() {
  const projecttypes = ref<any[]>([])
  const selectedProjecttype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadProjecttypes() {
    loading.value = true
    error.value = null

    try {
      projecttypes.value = await getProjecttypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadProjecttypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedProjecttype.value = await getProjecttypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    projecttypes,
    selectedProjecttype,
    loading,
    error,
    loadProjecttypes,
    loadProjecttypeById,
  }
}
