// Auto-generated file. Do not edit manually.
// Composable generated from databaseinstancetypeService.ts.

import { ref } from 'vue'
import { getDatabaseinstancetypes, getDatabaseinstancetypeById } from '@/services/generated/databaseinstancetypeService'

export function useDatabaseinstancetypes() {
  const databaseinstancetypes = ref<any[]>([])
  const selectedDatabaseinstancetype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDatabaseinstancetypes() {
    loading.value = true
    error.value = null

    try {
      databaseinstancetypes.value = await getDatabaseinstancetypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadDatabaseinstancetypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedDatabaseinstancetype.value = await getDatabaseinstancetypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    databaseinstancetypes,
    selectedDatabaseinstancetype,
    loading,
    error,
    loadDatabaseinstancetypes,
    loadDatabaseinstancetypeById,
  }
}
