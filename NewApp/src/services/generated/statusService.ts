// Auto-generated file. Do not edit manually.
// Service generated for /status.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getStatuslist = () =>
  getAll(ENDPOINTS.STATUS)
