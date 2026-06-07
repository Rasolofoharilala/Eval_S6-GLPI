// Auto-generated file. Do not edit manually.
// Composable generated from certificateService.ts.

import { ref } from 'vue'
import { getCertificates, getCertificateById } from '@/services/generated/certificateService'
import type { Certificate } from '@/services/generated/certificateService'

export function useCertificates() {
  const certificates = ref<Certificate[]>([])
  const selectedCertificate = ref<Certificate | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCertificates() {
    loading.value = true
    error.value = null

    try {
      certificates.value = await getCertificates()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadCertificateById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedCertificate.value = await getCertificateById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    certificates,
    selectedCertificate,
    loading,
    error,
    loadCertificates,
    loadCertificateById,
  }
}
