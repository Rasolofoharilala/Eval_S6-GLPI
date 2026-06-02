// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Stat/Ticket/Characteristics/Export.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getExports = () =>
  getAll(ENDPOINTS.ASSISTANCE_STAT_TICKET_CHARACTERISTICS_EXPORT)
