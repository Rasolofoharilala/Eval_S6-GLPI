// Auto-generated file. Do not edit manually.
// Service generated for /Setup/QueuedWebhook.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getQueuedwebhooks = () =>
  getAll(ENDPOINTS.SETUP_QUEUEDWEBHOOK)

export const getQueuedwebhookById = (id: number) =>
  getById(ENDPOINTS.SETUP_QUEUEDWEBHOOK, id)
