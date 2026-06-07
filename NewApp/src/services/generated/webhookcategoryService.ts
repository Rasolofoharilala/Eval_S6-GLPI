// Auto-generated file. Do not edit manually.
// Service generated for /Setup/WebhookCategory.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { WebhookCategory } from '@/types/generated'

export type { WebhookCategory } from '@/types/generated'

export const getWebhookcategories = () => getAll<WebhookCategory>(ENDPOINTS.SETUP_WEBHOOKCATEGORY)

export const getWebhookcategoryById = (id: number) =>
  getById<WebhookCategory>(ENDPOINTS.SETUP_WEBHOOKCATEGORY, id)
