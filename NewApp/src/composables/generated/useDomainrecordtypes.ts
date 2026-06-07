// Auto-generated file. Do not edit manually.
// Composable generated from domainrecordtypeService.ts.

import { ref } from 'vue'
import {
  getDomainrecordtypes,
  getDomainrecordtypeById,
} from '@/services/generated/domainrecordtypeService'
import type { DomainRecordType } from '@/services/generated/domainrecordtypeService'

export function useDomainrecordtypes() {
  const domainrecordtypes = ref<DomainRecordType[]>([])
  const selectedDomainrecordtype = ref<DomainRecordType | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDomainrecordtypes() {
    loading.value = true
    error.value = null

    try {
      domainrecordtypes.value = await getDomainrecordtypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadDomainrecordtypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedDomainrecordtype.value = await getDomainrecordtypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    domainrecordtypes,
    selectedDomainrecordtype,
    loading,
    error,
    loadDomainrecordtypes,
    loadDomainrecordtypeById,
  }
}
