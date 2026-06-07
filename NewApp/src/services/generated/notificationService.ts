// Auto-generated file. Do not edit manually.
// Service generated for /Notifications/Notification.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Notification } from '@/types/generated'

export type { Notification } from '@/types/generated'

export const getNotifications = () => getAll<Notification>(ENDPOINTS.NOTIFICATIONS_NOTIFICATION)

export const getNotificationById = (id: number) =>
  getById<Notification>(ENDPOINTS.NOTIFICATIONS_NOTIFICATION, id)
