// Auto-generated file. Do not edit manually.
// Service generated for /Notifications/QueuedNotification.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { QueuedNotification } from '@/types/generated'

export type { QueuedNotification } from '@/types/generated'

export const getQueuednotifications = () =>
  getAll<QueuedNotification>(ENDPOINTS.NOTIFICATIONS_QUEUEDNOTIFICATION)

export const getQueuednotificationById = (id: number) =>
  getById<QueuedNotification>(ENDPOINTS.NOTIFICATIONS_QUEUEDNOTIFICATION, id)
