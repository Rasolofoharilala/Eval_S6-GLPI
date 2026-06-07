// Auto-generated file. Do not edit manually.
// Composable generated from domainrecordService.ts.

import { ref } from 'vue'
import { getDomainrecords, getDomainrecordById } from '@/services/generated/domainrecordService'
import type { DomainRecord } from '@/services/generated/domainrecordService'

export function useDomainrecords() {
  const domainrecords = ref<DomainRecord[]>([])
  const selectedDomainrecord = ref<DomainRecord | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDomainrecords() {
    loading.value = true
    error.value = null

    try {
      domainrecords.value = await getDomainrecords()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadDomainrecordById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedDomainrecord.value = await getDomainrecordById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    domainrecords,
    selectedDomainrecord,
    loading,
    error,
    loadDomainrecords,
    loadDomainrecordById,
  }
}
