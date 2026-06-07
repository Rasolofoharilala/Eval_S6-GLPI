// Auto-generated file. Do not edit manually.
// Composable generated from consumableService.ts.

import { ref } from 'vue'
import { getConsumables, getConsumableById } from '@/services/generated/consumableService'
import type { ConsumableItem } from '@/services/generated/consumableService'

export function useConsumables() {
  const consumables = ref<ConsumableItem[]>([])
  const selectedConsumable = ref<ConsumableItem | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadConsumables() {
    loading.value = true
    error.value = null

    try {
      consumables.value = await getConsumables()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadConsumableById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedConsumable.value = await getConsumableById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    consumables,
    selectedConsumable,
    loading,
    error,
    loadConsumables,
    loadConsumableById,
  }
}
