// Auto-generated file. Do not edit manually.
// Composable generated from plugService.ts.

import { ref } from 'vue'
import { getPlugs, getPlugById } from '@/services/generated/plugService'

export function usePlugs() {
  const plugs = ref<any[]>([])
  const selectedPlug = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPlugs() {
    loading.value = true
    error.value = null

    try {
      plugs.value = await getPlugs()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPlugById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPlug.value = await getPlugById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    plugs,
    selectedPlug,
    loading,
    error,
    loadPlugs,
    loadPlugById,
  }
}
