// Auto-generated file. Do not edit manually.
// Composable generated from networkcardService.ts.

import { ref } from 'vue'
import { getNetworkcards, getNetworkcardById } from '@/services/generated/networkcardService'
import type { NetworkCard } from '@/services/generated/networkcardService'

export function useNetworkcards() {
  const networkcards = ref<NetworkCard[]>([])
  const selectedNetworkcard = ref<NetworkCard | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadNetworkcards() {
    loading.value = true
    error.value = null

    try {
      networkcards.value = await getNetworkcards()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadNetworkcardById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedNetworkcard.value = await getNetworkcardById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    networkcards,
    selectedNetworkcard,
    loading,
    error,
    loadNetworkcards,
    loadNetworkcardById,
  }
}
