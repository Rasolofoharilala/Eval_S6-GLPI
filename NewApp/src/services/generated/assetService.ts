// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Stat/Ticket/Asset.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getAssets = () => getAll(ENDPOINTS.ASSISTANCE_STAT_TICKET_ASSET)
