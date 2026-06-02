// Auto-generated file. Do not edit manually.
// Composable generated from licensetypeService.ts.

import { ref } from 'vue'
import { getLicensetypes, getLicensetypeById } from '@/services/generated/licensetypeService'

export function useLicensetypes() {
  const licensetypes = ref<any[]>([])
  const selectedLicensetype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadLicensetypes() {
    loading.value = true
    error.value = null

    try {
      licensetypes.value = await getLicensetypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadLicensetypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedLicensetype.value = await getLicensetypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    licensetypes,
    selectedLicensetype,
    loading,
    error,
    loadLicensetypes,
    loadLicensetypeById,
  }
}
