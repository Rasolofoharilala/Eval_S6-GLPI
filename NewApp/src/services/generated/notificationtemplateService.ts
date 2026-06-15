// Auto-generated file. Do not edit manually.
// Service generated for /Notifications/NotificationTemplate.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { NotificationTemplate } from '@/types/generated'

export type { NotificationTemplate } from '@/types/generated'

export const getNotificationtemplates = () =>
  getAll<NotificationTemplate>(ENDPOINTS.NOTIFICATIONS_NOTIFICATIONTEMPLATE)

export const getNotificationtemplateById = (id: number) =>
  getById<NotificationTemplate>(ENDPOINTS.NOTIFICATIONS_NOTIFICATIONTEMPLATE, id)
