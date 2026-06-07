// Auto-generated file. Do not edit manually.
// Composable generated from domainService.ts.

import { ref } from 'vue'
import { getDomains, getDomainById } from '@/services/generated/domainService'
import type { Domain } from '@/services/generated/domainService'

export function useDomains() {
  const domains = ref<Domain[]>([])
  const selectedDomain = ref<Domain | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDomains() {
    loading.value = true
    error.value = null

    try {
      domains.value = await getDomains()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadDomainById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedDomain.value = await getDomainById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    domains,
    selectedDomain,
    loading,
    error,
    loadDomains,
    loadDomainById,
  }
}
