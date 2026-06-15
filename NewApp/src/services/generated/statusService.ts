// Auto-generated file. Do not edit manually.
// Service generated for /status.

import { getAll } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'

export const getStatuslist = () => getAll<unknown>(ENDPOINTS.STATUS)
