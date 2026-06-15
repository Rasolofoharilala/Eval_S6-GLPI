// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Stat/Ticket/Characteristics.

import { getAll } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { ITILStats } from '@/types/generated'

export type { ITILStats } from '@/types/generated'

export const getCharacteristicslist = () =>
  getAll<ITILStats>(ENDPOINTS.ASSISTANCE_STAT_TICKET_CHARACTERISTICS)
