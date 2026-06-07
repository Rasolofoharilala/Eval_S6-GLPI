// Auto-generated file. Do not edit manually.
// Composable generated from notificationService.ts.

import { ref } from 'vue'
import { getNotifications, getNotificationById } from '@/services/generated/notificationService'
import type { Notification } from '@/services/generated/notificationService'

export function useNotifications() {
  const notifications = ref<Notification[]>([])
  const selectedNotification = ref<Notification | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadNotifications() {
    loading.value = true
    error.value = null

    try {
      notifications.value = await getNotifications()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadNotificationById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedNotification.value = await getNotificationById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    notifications,
    selectedNotification,
    loading,
    error,
    loadNotifications,
    loadNotificationById,
  }
}
