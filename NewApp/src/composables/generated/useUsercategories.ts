// Auto-generated file. Do not edit manually.
// Composable generated from usercategoryService.ts.

import { ref } from 'vue'
import { getUsercategories, getUsercategoryById } from '@/services/generated/usercategoryService'

export function useUsercategories() {
  const usercategories = ref<any[]>([])
  const selectedUsercategory = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadUsercategories() {
    loading.value = true
    error.value = null

    try {
      usercategories.value = await getUsercategories()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadUsercategoryById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedUsercategory.value = await getUsercategoryById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    usercategories,
    selectedUsercategory,
    loading,
    error,
    loadUsercategories,
    loadUsercategoryById,
  }
}
