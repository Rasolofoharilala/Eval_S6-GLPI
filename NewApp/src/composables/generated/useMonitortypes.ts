// Auto-generated file. Do not edit manually.
// Composable generated from monitortypeService.ts.

import { ref } from 'vue'
import { getMonitortypes, getMonitortypeById } from '@/services/generated/monitortypeService'
import type { MonitorType } from '@/services/generated/monitortypeService'

export function useMonitortypes() {
  const monitortypes = ref<MonitorType[]>([])
  const selectedMonitortype = ref<MonitorType | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadMonitortypes() {
    loading.value = true
    error.value = null

    try {
      monitortypes.value = await getMonitortypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadMonitortypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedMonitortype.value = await getMonitortypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    monitortypes,
    selectedMonitortype,
    loading,
    error,
    loadMonitortypes,
    loadMonitortypeById,
  }
}
