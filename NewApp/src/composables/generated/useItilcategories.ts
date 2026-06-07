// Auto-generated file. Do not edit manually.
// Composable generated from itilcategoryService.ts.

import { ref } from 'vue'
import { getItilcategories, getItilcategoryById } from '@/services/generated/itilcategoryService'
import type { ITILCategory } from '@/services/generated/itilcategoryService'

export function useItilcategories() {
  const itilcategories = ref<ITILCategory[]>([])
  const selectedItilcategory = ref<ITILCategory | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadItilcategories() {
    loading.value = true
    error.value = null

    try {
      itilcategories.value = await getItilcategories()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadItilcategoryById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedItilcategory.value = await getItilcategoryById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    itilcategories,
    selectedItilcategory,
    loading,
    error,
    loadItilcategories,
    loadItilcategoryById,
  }
}
