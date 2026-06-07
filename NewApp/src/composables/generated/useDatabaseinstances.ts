// Auto-generated file. Do not edit manually.
// Composable generated from databaseinstanceService.ts.

import { ref } from 'vue'
import {
  getDatabaseinstances,
  getDatabaseinstanceById,
} from '@/services/generated/databaseinstanceService'

export function useDatabaseinstances() {
  const databaseinstances = ref<any[]>([])
  const selectedDatabaseinstance = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDatabaseinstances() {
    loading.value = true
    error.value = null

    try {
      databaseinstances.value = await getDatabaseinstances()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadDatabaseinstanceById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedDatabaseinstance.value = await getDatabaseinstanceById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    databaseinstances,
    selectedDatabaseinstance,
    loading,
    error,
    loadDatabaseinstances,
    loadDatabaseinstanceById,
  }
}
