// Auto-generated file. Do not edit manually.
// Composable generated from licenseService.ts.

import { ref } from 'vue'
import { getLicenses, getLicenseById } from '@/services/generated/licenseService'
import type { License } from '@/services/generated/licenseService'

export function useLicenses() {
  const licenses = ref<License[]>([])
  const selectedLicense = ref<License | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadLicenses() {
    loading.value = true
    error.value = null

    try {
      licenses.value = await getLicenses()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadLicenseById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedLicense.value = await getLicenseById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    licenses,
    selectedLicense,
    loading,
    error,
    loadLicenses,
    loadLicenseById,
  }
}
