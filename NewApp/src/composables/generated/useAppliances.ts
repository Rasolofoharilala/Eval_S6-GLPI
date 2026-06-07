// Auto-generated file. Do not edit manually.
// Composable generated from applianceService.ts.

import { ref } from 'vue'
import { getAppliances, getApplianceById } from '@/services/generated/applianceService'
import type { Appliance } from '@/services/generated/applianceService'

export function useAppliances() {
  const appliances = ref<Appliance[]>([])
  const selectedAppliance = ref<Appliance | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadAppliances() {
    loading.value = true
    error.value = null

    try {
      appliances.value = await getAppliances()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadApplianceById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedAppliance.value = await getApplianceById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    appliances,
    selectedAppliance,
    loading,
    error,
    loadAppliances,
    loadApplianceById,
  }
}
