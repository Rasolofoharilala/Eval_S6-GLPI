// Auto-generated file. Do not edit manually.
// Composable generated from passivedcequipmentService.ts.

import { ref } from 'vue'
import { getPassivedcequipments, getPassivedcequipmentById } from '@/services/generated/passivedcequipmentService'

export function usePassivedcequipments() {
  const passivedcequipments = ref<any[]>([])
  const selectedPassivedcequipment = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPassivedcequipments() {
    loading.value = true
    error.value = null

    try {
      passivedcequipments.value = await getPassivedcequipments()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPassivedcequipmentById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPassivedcequipment.value = await getPassivedcequipmentById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    passivedcequipments,
    selectedPassivedcequipment,
    loading,
    error,
    loadPassivedcequipments,
    loadPassivedcequipmentById,
  }
}
