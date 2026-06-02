// Auto-generated file. Do not edit manually.
// Composable generated from cartridgeitemtypeService.ts.

import { ref } from 'vue'
import { getCartridgeitemtypes, getCartridgeitemtypeById } from '@/services/generated/cartridgeitemtypeService'

export function useCartridgeitemtypes() {
  const cartridgeitemtypes = ref<any[]>([])
  const selectedCartridgeitemtype = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCartridgeitemtypes() {
    loading.value = true
    error.value = null

    try {
      cartridgeitemtypes.value = await getCartridgeitemtypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadCartridgeitemtypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedCartridgeitemtype.value = await getCartridgeitemtypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    cartridgeitemtypes,
    selectedCartridgeitemtype,
    loading,
    error,
    loadCartridgeitemtypes,
    loadCartridgeitemtypeById,
  }
}
