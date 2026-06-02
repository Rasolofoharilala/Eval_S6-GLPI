// Auto-generated file. Do not edit manually.
// Service generated for /Notifications/NotificationTemplate.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getNotificationtemplates = () =>
  getAll(ENDPOINTS.NOTIFICATIONS_NOTIFICATIONTEMPLATE)

export const getNotificationtemplateById = (id: number) =>
  getById(ENDPOINTS.NOTIFICATIONS_NOTIFICATIONTEMPLATE, id)
