// Auto-generated file. Do not edit manually.
// Composable generated from graphiccardService.ts.

import { ref } from 'vue'
import { getGraphiccards, getGraphiccardById } from '@/services/generated/graphiccardService'
import type { GraphicCard } from '@/services/generated/graphiccardService'

export function useGraphiccards() {
  const graphiccards = ref<GraphicCard[]>([])
  const selectedGraphiccard = ref<GraphicCard | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadGraphiccards() {
    loading.value = true
    error.value = null

    try {
      graphiccards.value = await getGraphiccards()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadGraphiccardById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedGraphiccard.value = await getGraphiccardById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    graphiccards,
    selectedGraphiccard,
    loading,
    error,
    loadGraphiccards,
    loadGraphiccardById,
  }
}
