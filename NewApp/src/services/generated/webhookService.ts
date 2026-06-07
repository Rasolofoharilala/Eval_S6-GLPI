// Auto-generated file. Do not edit manually.
// Service generated for /Setup/Webhook.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getWebhooks = () => getAll(ENDPOINTS.SETUP_WEBHOOK)

export const getWebhookById = (id: number) => getById(ENDPOINTS.SETUP_WEBHOOK, id)
