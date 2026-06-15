// Auto-generated file. Do not edit manually.
// Service generated for /status/all.

import { getAll } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'

export const getAlls = () => getAll<unknown>(ENDPOINTS.STATUS_ALL)
