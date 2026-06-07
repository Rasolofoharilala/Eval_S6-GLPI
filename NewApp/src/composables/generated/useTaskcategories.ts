// Auto-generated file. Do not edit manually.
// Composable generated from taskcategoryService.ts.

import { ref } from 'vue'
import { getTaskcategories, getTaskcategoryById } from '@/services/generated/taskcategoryService'
import type { TaskCategory } from '@/services/generated/taskcategoryService'

export function useTaskcategories() {
  const taskcategories = ref<TaskCategory[]>([])
  const selectedTaskcategory = ref<TaskCategory | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadTaskcategories() {
    loading.value = true
    error.value = null

    try {
      taskcategories.value = await getTaskcategories()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadTaskcategoryById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedTaskcategory.value = await getTaskcategoryById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    taskcategories,
    selectedTaskcategory,
    loading,
    error,
    loadTaskcategories,
    loadTaskcategoryById,
  }
}
