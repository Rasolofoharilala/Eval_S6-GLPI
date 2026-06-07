// Auto-generated file. Do not edit manually.
// Service generated for /Setup/WebhookCategory.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getWebhookcategories = () => getAll(ENDPOINTS.SETUP_WEBHOOKCATEGORY)

export const getWebhookcategoryById = (id: number) => getById(ENDPOINTS.SETUP_WEBHOOKCATEGORY, id)
