// Auto-generated file. Do not edit manually.
// Composable generated from socketService.ts.

import { ref } from 'vue'
import { getSockets, getSocketById } from '@/services/generated/socketService'

export function useSockets() {
  const sockets = ref<any[]>([])
  const selectedSocket = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadSockets() {
    loading.value = true
    error.value = null

    try {
      sockets.value = await getSockets()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadSocketById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedSocket.value = await getSocketById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    sockets,
    selectedSocket,
    loading,
    error,
    loadSockets,
    loadSocketById,
  }
}
