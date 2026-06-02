// Auto-generated file. Do not edit manually.
// Composable generated from itemPlugService.ts.

import { ref } from 'vue'
import { getItemplugs, getItemPlugById } from '@/services/generated/itemPlugService'

export function useItemplugs() {
  const itemplugs = ref<any[]>([])
  const selectedItemplug = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadItemplugs() {
    loading.value = true
    error.value = null

    try {
      itemplugs.value = await getItemplugs()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadItemplugById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedItemplug.value = await getItemPlugById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    itemplugs,
    selectedItemplug,
    loading,
    error,
    loadItemplugs,
    loadItemplugById,
  }
}
