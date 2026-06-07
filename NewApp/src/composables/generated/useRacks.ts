// Auto-generated file. Do not edit manually.
// Composable generated from rackService.ts.

import { ref } from 'vue'
import { getRacks, getRackById } from '@/services/generated/rackService'
import type { Rack } from '@/services/generated/rackService'

export function useRacks() {
  const racks = ref<Rack[]>([])
  const selectedRack = ref<Rack | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadRacks() {
    loading.value = true
    error.value = null

    try {
      racks.value = await getRacks()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadRackById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedRack.value = await getRackById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    racks,
    selectedRack,
    loading,
    error,
    loadRacks,
    loadRackById,
  }
}
