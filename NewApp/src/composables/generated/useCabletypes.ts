// Auto-generated file. Do not edit manually.
// Composable generated from cabletypeService.ts.

import { ref } from 'vue'
import { getCabletypes, getCabletypeById } from '@/services/generated/cabletypeService'

export function useCabletypes() {
  const cabletypes = ref<any[]>([])
  const selectedCabletype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCabletypes() {
    loading.value = true
    error.value = null

    try {
      cabletypes.value = await getCabletypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadCabletypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedCabletype.value = await getCabletypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    cabletypes,
    selectedCabletype,
    loading,
    error,
    loadCabletypes,
    loadCabletypeById,
  }
}
