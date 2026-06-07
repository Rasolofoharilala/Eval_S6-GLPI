// Auto-generated file. Do not edit manually.
// Composable generated from cartridgeService.ts.

import { ref } from 'vue'
import { getCartridges, getCartridgeById } from '@/services/generated/cartridgeService'
import type { CartridgeItem } from '@/services/generated/cartridgeService'

export function useCartridges() {
  const cartridges = ref<CartridgeItem[]>([])
  const selectedCartridge = ref<CartridgeItem | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCartridges() {
    loading.value = true
    error.value = null

    try {
      cartridges.value = await getCartridges()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadCartridgeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedCartridge.value = await getCartridgeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    cartridges,
    selectedCartridge,
    loading,
    error,
    loadCartridges,
    loadCartridgeById,
  }
}
