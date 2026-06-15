// Auto-generated file. Do not edit manually.
// Service generated for /Setup/Webhook.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { Webhook } from '@/types/generated'

export type { Webhook } from '@/types/generated'

export const getWebhooks = () => getAll<Webhook>(ENDPOINTS.SETUP_WEBHOOK)

export const getWebhookById = (id: number) => getById<Webhook>(ENDPOINTS.SETUP_WEBHOOK, id)
