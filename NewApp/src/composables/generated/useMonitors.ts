// Auto-generated file. Do not edit manually.
// Composable generated from monitorService.ts.

import { ref } from 'vue'
import { getMonitors, getMonitorById } from '@/services/generated/monitorService'

export function useMonitors() {
  const monitors = ref<any[]>([])
  const selectedMonitor = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadMonitors() {
    loading.value = true
    error.value = null

    try {
      monitors.value = await getMonitors()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadMonitorById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedMonitor.value = await getMonitorById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    monitors,
    selectedMonitor,
    loading,
    error,
    loadMonitors,
    loadMonitorById,
  }
}
