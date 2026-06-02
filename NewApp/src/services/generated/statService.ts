// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Stat.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getStats = () =>
  getAll(ENDPOINTS.ASSISTANCE_STAT)
