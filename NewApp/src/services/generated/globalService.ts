// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Stat/Ticket/Global.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { GlobalStats } from '@/types/generated'

export type { GlobalStats } from '@/types/generated'

export const getGlobals = () => getAll<GlobalStats>(ENDPOINTS.ASSISTANCE_STAT_TICKET_GLOBAL)
