// Auto-generated file. Do not edit manually.
// Composable generated from applianceenvironmentService.ts.

import { ref } from 'vue'
import {
  getApplianceenvironments,
  getApplianceenvironmentById,
} from '@/services/generated/applianceenvironmentService'

export function useApplianceenvironments() {
  const applianceenvironments = ref<any[]>([])
  const selectedApplianceenvironment = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadApplianceenvironments() {
    loading.value = true
    error.value = null

    try {
      applianceenvironments.value = await getApplianceenvironments()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadApplianceenvironmentById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedApplianceenvironment.value = await getApplianceenvironmentById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    applianceenvironments,
    selectedApplianceenvironment,
    loading,
    error,
    loadApplianceenvironments,
    loadApplianceenvironmentById,
  }
}
