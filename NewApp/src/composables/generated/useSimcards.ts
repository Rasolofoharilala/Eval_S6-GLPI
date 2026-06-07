// Auto-generated file. Do not edit manually.
// Composable generated from simcardService.ts.

import { ref } from 'vue'
import { getSimcards, getSimcardById } from '@/services/generated/simcardService'
import type { SIMCard } from '@/services/generated/simcardService'

export function useSimcards() {
  const simcards = ref<SIMCard[]>([])
  const selectedSimcard = ref<SIMCard | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadSimcards() {
    loading.value = true
    error.value = null

    try {
      simcards.value = await getSimcards()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadSimcardById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedSimcard.value = await getSimcardById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    simcards,
    selectedSimcard,
    loading,
    error,
    loadSimcards,
    loadSimcardById,
  }
}
