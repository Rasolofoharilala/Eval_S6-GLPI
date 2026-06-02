// Auto-generated file. Do not edit manually.
// Composable generated from eventcategoryService.ts.

import { ref } from 'vue'
import { getEventcategories, getEventcategoryById } from '@/services/generated/eventcategoryService'

export function useEventcategories() {
  const eventcategories = ref<any[]>([])
  const selectedEventcategory = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadEventcategories() {
    loading.value = true
    error.value = null

    try {
      eventcategories.value = await getEventcategories()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadEventcategoryById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedEventcategory.value = await getEventcategoryById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    eventcategories,
    selectedEventcategory,
    loading,
    error,
    loadEventcategories,
    loadEventcategoryById,
  }
}
