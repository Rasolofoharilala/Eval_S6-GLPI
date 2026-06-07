// Auto-generated file. Do not edit manually.
// Composable generated from collectionService.ts.

import { ref } from 'vue'
import { getCollections } from '@/services/generated/collectionService'

export function useCollections() {
  const collections = ref<unknown[]>([])
  const selectedCollection = ref<unknown | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCollections() {
    loading.value = true
    error.value = null

    try {
      collections.value = await getCollections()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    collections,
    selectedCollection,
    loading,
    error,
    loadCollections,
  }
}
