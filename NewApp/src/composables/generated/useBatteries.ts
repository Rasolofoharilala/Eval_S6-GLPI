// Auto-generated file. Do not edit manually.
// Composable generated from batteryService.ts.

import { ref } from 'vue'
import { getBatteries, getBatteryById } from '@/services/generated/batteryService'

export function useBatteries() {
  const batteries = ref<any[]>([])
  const selectedBattery = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadBatteries() {
    loading.value = true
    error.value = null

    try {
      batteries.value = await getBatteries()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadBatteryById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedBattery.value = await getBatteryById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    batteries,
    selectedBattery,
    loading,
    error,
    loadBatteries,
    loadBatteryById,
  }
}
