// Auto-generated file. Do not edit manually.
// Composable generated from notificationtemplateService.ts.

import { ref } from 'vue'
import {
  getNotificationtemplates,
  getNotificationtemplateById,
} from '@/services/generated/notificationtemplateService'
import type { NotificationTemplate } from '@/services/generated/notificationtemplateService'

export function useNotificationtemplates() {
  const notificationtemplates = ref<NotificationTemplate[]>([])
  const selectedNotificationtemplate = ref<NotificationTemplate | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadNotificationtemplates() {
    loading.value = true
    error.value = null

    try {
      notificationtemplates.value = await getNotificationtemplates()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadNotificationtemplateById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedNotificationtemplate.value = await getNotificationtemplateById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    notificationtemplates,
    selectedNotificationtemplate,
    loading,
    error,
    loadNotificationtemplates,
    loadNotificationtemplateById,
  }
}
