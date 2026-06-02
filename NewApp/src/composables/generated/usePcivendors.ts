// Auto-generated file. Do not edit manually.
// Composable generated from pcivendorService.ts.

import { ref } from 'vue'
import { getPcivendors, getPcivendorById } from '@/services/generated/pcivendorService'

export function usePcivendors() {
  const pcivendors = ref<any[]>([])
  const selectedPcivendor = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPcivendors() {
    loading.value = true
    error.value = null

    try {
      pcivendors.value = await getPcivendors()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPcivendorById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPcivendor.value = await getPcivendorById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    pcivendors,
    selectedPcivendor,
    loading,
    error,
    loadPcivendors,
    loadPcivendorById,
  }
}
