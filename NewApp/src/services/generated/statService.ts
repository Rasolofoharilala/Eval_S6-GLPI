// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Stat.

import { getAll } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { StatReport } from '@/types/generated'

export type { StatReport } from '@/types/generated'

export const getStats = () => getAll<StatReport>(ENDPOINTS.ASSISTANCE_STAT)
