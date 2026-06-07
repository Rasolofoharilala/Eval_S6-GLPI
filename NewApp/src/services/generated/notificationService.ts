// Auto-generated file. Do not edit manually.
// Service generated for /Notifications/Notification.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getNotifications = () => getAll(ENDPOINTS.NOTIFICATIONS_NOTIFICATION)

export const getNotificationById = (id: number) => getById(ENDPOINTS.NOTIFICATIONS_NOTIFICATION, id)
