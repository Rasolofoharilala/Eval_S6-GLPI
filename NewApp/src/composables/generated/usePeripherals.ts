// Auto-generated file. Do not edit manually.
// Composable generated from peripheralService.ts.

import { ref } from 'vue'
import { getPeripherals, getPeripheralById } from '@/services/generated/peripheralService'
import type { Peripheral } from '@/services/generated/peripheralService'

export function usePeripherals() {
  const peripherals = ref<Peripheral[]>([])
  const selectedPeripheral = ref<Peripheral | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPeripherals() {
    loading.value = true
    error.value = null

    try {
      peripherals.value = await getPeripherals()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPeripheralById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPeripheral.value = await getPeripheralById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    peripherals,
    selectedPeripheral,
    loading,
    error,
    loadPeripherals,
    loadPeripheralById,
  }
}
