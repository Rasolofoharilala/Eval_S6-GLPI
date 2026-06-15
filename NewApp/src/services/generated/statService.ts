// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Stat.

import { getAll } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { StatReport } from '@/types/generated'

export type { StatReport } from '@/types/generated'

export const getStats = () => getAll<StatReport>(ENDPOINTS.ASSISTANCE_STAT)
