// Auto-generated file. Do not edit manually.
// Composable generated from enclosureService.ts.

import { ref } from 'vue'
import { getEnclosures, getEnclosureById } from '@/services/generated/enclosureService'
import type { Enclosure } from '@/services/generated/enclosureService'

export function useEnclosures() {
  const enclosures = ref<Enclosure[]>([])
  const selectedEnclosure = ref<Enclosure | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadEnclosures() {
    loading.value = true
    error.value = null

    try {
      enclosures.value = await getEnclosures()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadEnclosureById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedEnclosure.value = await getEnclosureById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    enclosures,
    selectedEnclosure,
    loading,
    error,
    loadEnclosures,
    loadEnclosureById,
  }
}
