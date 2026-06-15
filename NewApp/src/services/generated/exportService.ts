// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Stat/Ticket/Characteristics/Export.

import { getAll } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'

export const getExports = () =>
  getAll<unknown>(ENDPOINTS.ASSISTANCE_STAT_TICKET_CHARACTERISTICS_EXPORT)
