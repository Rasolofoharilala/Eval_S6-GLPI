// Auto-generated file. Do not edit manually.
// Composable generated from phonetypeService.ts.

import { ref } from 'vue'
import { getPhonetypes, getPhonetypeById } from '@/services/generated/phonetypeService'

export function usePhonetypes() {
  const phonetypes = ref<any[]>([])
  const selectedPhonetype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPhonetypes() {
    loading.value = true
    error.value = null

    try {
      phonetypes.value = await getPhonetypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPhonetypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPhonetype.value = await getPhonetypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    phonetypes,
    selectedPhonetype,
    loading,
    error,
    loadPhonetypes,
    loadPhonetypeById,
  }
}
