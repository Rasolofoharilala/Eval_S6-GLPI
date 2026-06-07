// Auto-generated file. Do not edit manually.
// Composable generated from lineService.ts.

import { ref } from 'vue'
import { getLines, getLineById } from '@/services/generated/lineService'
import type { Line } from '@/services/generated/lineService'

export function useLines() {
  const lines = ref<Line[]>([])
  const selectedLine = ref<Line | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadLines() {
    loading.value = true
    error.value = null

    try {
      lines.value = await getLines()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadLineById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedLine.value = await getLineById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    lines,
    selectedLine,
    loading,
    error,
    loadLines,
    loadLineById,
  }
}
