// Auto-generated file. Do not edit manually.
// Composable generated from databaseService.ts.

import { ref } from 'vue'
import { getDatabases, getDatabaseById } from '@/services/generated/databaseService'
import type { Database } from '@/services/generated/databaseService'

export function useDatabases() {
  const databases = ref<Database[]>([])
  const selectedDatabase = ref<Database | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDatabases() {
    loading.value = true
    error.value = null

    try {
      databases.value = await getDatabases()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadDatabaseById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedDatabase.value = await getDatabaseById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    databases,
    selectedDatabase,
    loading,
    error,
    loadDatabases,
    loadDatabaseById,
  }
}
