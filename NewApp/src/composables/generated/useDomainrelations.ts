// Auto-generated file. Do not edit manually.
// Composable generated from domainrelationService.ts.

import { ref } from 'vue'
import {
  getDomainrelations,
  getDomainrelationById,
} from '@/services/generated/domainrelationService'
import type { DomainRelation } from '@/services/generated/domainrelationService'

export function useDomainrelations() {
  const domainrelations = ref<DomainRelation[]>([])
  const selectedDomainrelation = ref<DomainRelation | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDomainrelations() {
    loading.value = true
    error.value = null

    try {
      domainrelations.value = await getDomainrelations()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadDomainrelationById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedDomainrelation.value = await getDomainrelationById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    domainrelations,
    selectedDomainrelation,
    loading,
    error,
    loadDomainrelations,
    loadDomainrelationById,
  }
}
