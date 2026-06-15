// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Stat/Ticket/Global.

import { getAll } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { GlobalStats } from '@/types/generated'

export type { GlobalStats } from '@/types/generated'

export const getGlobals = () => getAll<GlobalStats>(ENDPOINTS.ASSISTANCE_STAT_TICKET_GLOBAL)
