// Auto-generated file. Do not edit manually.
// Composable generated from queuedwebhookService.ts.

import { ref } from 'vue'
import { getQueuedwebhooks, getQueuedwebhookById } from '@/services/generated/queuedwebhookService'

export function useQueuedwebhooks() {
  const queuedwebhooks = ref<any[]>([])
  const selectedQueuedwebhook = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadQueuedwebhooks() {
    loading.value = true
    error.value = null

    try {
      queuedwebhooks.value = await getQueuedwebhooks()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadQueuedwebhookById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedQueuedwebhook.value = await getQueuedwebhookById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    queuedwebhooks,
    selectedQueuedwebhook,
    loading,
    error,
    loadQueuedwebhooks,
    loadQueuedwebhookById,
  }
}
