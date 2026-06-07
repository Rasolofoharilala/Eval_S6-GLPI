// Auto-generated file. Do not edit manually.
// Composable generated from queuednotificationService.ts.

import { ref } from 'vue'
import {
  getQueuednotifications,
  getQueuednotificationById,
} from '@/services/generated/queuednotificationService'
import type { QueuedNotification } from '@/services/generated/queuednotificationService'

export function useQueuednotifications() {
  const queuednotifications = ref<QueuedNotification[]>([])
  const selectedQueuednotification = ref<QueuedNotification | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadQueuednotifications() {
    loading.value = true
    error.value = null

    try {
      queuednotifications.value = await getQueuednotifications()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadQueuednotificationById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedQueuednotification.value = await getQueuednotificationById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    queuednotifications,
    selectedQueuednotification,
    loading,
    error,
    loadQueuednotifications,
    loadQueuednotificationById,
  }
}
