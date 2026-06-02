// Auto-generated file. Do not edit manually.
// Composable generated from denylistService.ts.

import { ref } from 'vue'
import { getDenylists, getDenylistById } from '@/services/generated/denylistService'

export function useDenylists() {
  const denylists = ref<any[]>([])
  const selectedDenylist = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDenylists() {
    loading.value = true
    error.value = null

    try {
      denylists.value = await getDenylists()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadDenylistById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedDenylist.value = await getDenylistById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    denylists,
    selectedDenylist,
    loading,
    error,
    loadDenylists,
    loadDenylistById,
  }
}
