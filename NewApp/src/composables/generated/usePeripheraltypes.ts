// Auto-generated file. Do not edit manually.
// Composable generated from peripheraltypeService.ts.

import { ref } from 'vue'
import {
  getPeripheraltypes,
  getPeripheraltypeById,
} from '@/services/generated/peripheraltypeService'

export function usePeripheraltypes() {
  const peripheraltypes = ref<any[]>([])
  const selectedPeripheraltype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPeripheraltypes() {
    loading.value = true
    error.value = null

    try {
      peripheraltypes.value = await getPeripheraltypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPeripheraltypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPeripheraltype.value = await getPeripheraltypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    peripheraltypes,
    selectedPeripheraltype,
    loading,
    error,
    loadPeripheraltypes,
    loadPeripheraltypeById,
  }
}
