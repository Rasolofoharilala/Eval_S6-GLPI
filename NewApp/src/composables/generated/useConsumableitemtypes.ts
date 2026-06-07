// Auto-generated file. Do not edit manually.
// Composable generated from consumableitemtypeService.ts.

import { ref } from 'vue'
import {
  getConsumableitemtypes,
  getConsumableitemtypeById,
} from '@/services/generated/consumableitemtypeService'
import type { ConsumableItemType } from '@/services/generated/consumableitemtypeService'

export function useConsumableitemtypes() {
  const consumableitemtypes = ref<ConsumableItemType[]>([])
  const selectedConsumableitemtype = ref<ConsumableItemType | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadConsumableitemtypes() {
    loading.value = true
    error.value = null

    try {
      consumableitemtypes.value = await getConsumableitemtypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadConsumableitemtypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedConsumableitemtype.value = await getConsumableitemtypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    consumableitemtypes,
    selectedConsumableitemtype,
    loading,
    error,
    loadConsumableitemtypes,
    loadConsumableitemtypeById,
  }
}
