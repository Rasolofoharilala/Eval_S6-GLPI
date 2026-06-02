// Auto-generated file. Do not edit manually.
// Composable generated from sensorService.ts.

import { ref } from 'vue'
import { getSensors, getSensorById } from '@/services/generated/sensorService'

export function useSensors() {
  const sensors = ref<any[]>([])
  const selectedSensor = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadSensors() {
    loading.value = true
    error.value = null

    try {
      sensors.value = await getSensors()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadSensorById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedSensor.value = await getSensorById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    sensors,
    selectedSensor,
    loading,
    error,
    loadSensors,
    loadSensorById,
  }
}
