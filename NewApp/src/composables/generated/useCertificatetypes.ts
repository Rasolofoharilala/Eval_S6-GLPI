// Auto-generated file. Do not edit manually.
// Composable generated from certificatetypeService.ts.

import { ref } from 'vue'
import { getCertificatetypes, getCertificatetypeById } from '@/services/generated/certificatetypeService'

export function useCertificatetypes() {
  const certificatetypes = ref<any[]>([])
  const selectedCertificatetype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCertificatetypes() {
    loading.value = true
    error.value = null

    try {
      certificatetypes.value = await getCertificatetypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadCertificatetypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedCertificatetype.value = await getCertificatetypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    certificatetypes,
    selectedCertificatetype,
    loading,
    error,
    loadCertificatetypes,
    loadCertificatetypeById,
  }
}
