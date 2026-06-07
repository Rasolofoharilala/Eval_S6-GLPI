// Auto-generated file. Do not edit manually.
// Composable generated from databaseinstancecategoryService.ts.

import { ref } from 'vue'
import {
  getDatabaseinstancecategories,
  getDatabaseinstancecategoryById,
} from '@/services/generated/databaseinstancecategoryService'
import type { DatabaseInstanceCategory } from '@/services/generated/databaseinstancecategoryService'

export function useDatabaseinstancecategories() {
  const databaseinstancecategories = ref<DatabaseInstanceCategory[]>([])
  const selectedDatabaseinstancecategory = ref<DatabaseInstanceCategory | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDatabaseinstancecategories() {
    loading.value = true
    error.value = null

    try {
      databaseinstancecategories.value = await getDatabaseinstancecategories()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadDatabaseinstancecategoryById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedDatabaseinstancecategory.value = await getDatabaseinstancecategoryById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    databaseinstancecategories,
    selectedDatabaseinstancecategory,
    loading,
    error,
    loadDatabaseinstancecategories,
    loadDatabaseinstancecategoryById,
  }
}
