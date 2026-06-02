// Auto-generated file. Do not edit manually.
// Composable generated from appliancetypeService.ts.

import { ref } from 'vue'
import { getAppliancetypes, getAppliancetypeById } from '@/services/generated/appliancetypeService'

export function useAppliancetypes() {
  const appliancetypes = ref<any[]>([])
  const selectedAppliancetype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadAppliancetypes() {
    loading.value = true
    error.value = null

    try {
      appliancetypes.value = await getAppliancetypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadAppliancetypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedAppliancetype.value = await getAppliancetypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    appliancetypes,
    selectedAppliancetype,
    loading,
    error,
    loadAppliancetypes,
    loadAppliancetypeById,
  }
}
