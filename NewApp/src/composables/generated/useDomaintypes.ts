// Auto-generated file. Do not edit manually.
// Composable generated from domaintypeService.ts.

import { ref } from 'vue'
import { getDomaintypes, getDomaintypeById } from '@/services/generated/domaintypeService'

export function useDomaintypes() {
  const domaintypes = ref<any[]>([])
  const selectedDomaintype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDomaintypes() {
    loading.value = true
    error.value = null

    try {
      domaintypes.value = await getDomaintypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadDomaintypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedDomaintype.value = await getDomaintypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    domaintypes,
    selectedDomaintype,
    loading,
    error,
    loadDomaintypes,
    loadDomaintypeById,
  }
}
