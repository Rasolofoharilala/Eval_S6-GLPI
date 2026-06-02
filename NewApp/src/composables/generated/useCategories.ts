// Auto-generated file. Do not edit manually.
// Composable generated from categoryService.ts.

import { ref } from 'vue'
import { getCategories, getCategoryById } from '@/services/generated/categoryService'

export function useCategories() {
  const categories = ref<any[]>([])
  const selectedCategory = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCategories() {
    loading.value = true
    error.value = null

    try {
      categories.value = await getCategories()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadCategoryById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedCategory.value = await getCategoryById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    selectedCategory,
    loading,
    error,
    loadCategories,
    loadCategoryById,
  }
}
