// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Stat/Ticket/Characteristics.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getCharacteristicslist = () =>
  getAll(ENDPOINTS.ASSISTANCE_STAT_TICKET_CHARACTERISTICS)
