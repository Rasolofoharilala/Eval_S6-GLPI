// Auto-generated file. Do not edit manually.
// Composable generated from cablestrandService.ts.

import { ref } from 'vue'
import { getCablestrands, getCablestrandById } from '@/services/generated/cablestrandService'

export function useCablestrands() {
  const cablestrands = ref<any[]>([])
  const selectedCablestrand = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCablestrands() {
    loading.value = true
    error.value = null

    try {
      cablestrands.value = await getCablestrands()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadCablestrandById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedCablestrand.value = await getCablestrandById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    cablestrands,
    selectedCablestrand,
    loading,
    error,
    loadCablestrands,
    loadCablestrandById,
  }
}
