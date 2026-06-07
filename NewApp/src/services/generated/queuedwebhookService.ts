// Auto-generated file. Do not edit manually.
// Service generated for /Setup/QueuedWebhook.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { QueuedWebhook } from '@/types/generated'

export type { QueuedWebhook } from '@/types/generated'

export const getQueuedwebhooks = () => getAll<QueuedWebhook>(ENDPOINTS.SETUP_QUEUEDWEBHOOK)

export const getQueuedwebhookById = (id: number) =>
  getById<QueuedWebhook>(ENDPOINTS.SETUP_QUEUEDWEBHOOK, id)
