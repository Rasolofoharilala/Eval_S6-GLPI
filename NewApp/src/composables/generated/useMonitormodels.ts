// Auto-generated file. Do not edit manually.
// Composable generated from monitormodelService.ts.

import { ref } from 'vue'
import { getMonitormodels, getMonitormodelById } from '@/services/generated/monitormodelService'
import type { MonitorModel } from '@/services/generated/monitormodelService'

export function useMonitormodels() {
  const monitormodels = ref<MonitorModel[]>([])
  const selectedMonitormodel = ref<MonitorModel | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadMonitormodels() {
    loading.value = true
    error.value = null

    try {
      monitormodels.value = await getMonitormodels()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadMonitormodelById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedMonitormodel.value = await getMonitormodelById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    monitormodels,
    selectedMonitormodel,
    loading,
    error,
    loadMonitormodels,
    loadMonitormodelById,
  }
}
