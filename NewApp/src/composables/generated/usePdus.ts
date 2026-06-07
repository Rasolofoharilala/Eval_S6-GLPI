// Auto-generated file. Do not edit manually.
// Composable generated from pduService.ts.

import { ref } from 'vue'
import { getPdus, getPduById } from '@/services/generated/pduService'
import type { PDU } from '@/services/generated/pduService'

export function usePdus() {
  const pdus = ref<PDU[]>([])
  const selectedPdu = ref<PDU | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPdus() {
    loading.value = true
    error.value = null

    try {
      pdus.value = await getPdus()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPduById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPdu.value = await getPduById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    pdus,
    selectedPdu,
    loading,
    error,
    loadPdus,
    loadPduById,
  }
}
