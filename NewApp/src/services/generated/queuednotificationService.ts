// Auto-generated file. Do not edit manually.
// Service generated for /Notifications/QueuedNotification.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getQueuednotifications = () =>
  getAll(ENDPOINTS.NOTIFICATIONS_QUEUEDNOTIFICATION)

export const getQueuednotificationById = (id: number) =>
  getById(ENDPOINTS.NOTIFICATIONS_QUEUEDNOTIFICATION, id)
