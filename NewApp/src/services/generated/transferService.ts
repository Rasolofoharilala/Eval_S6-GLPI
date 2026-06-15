// Auto-generated file. Do not edit manually.
// Service generated for /Transfer.

import { getAll } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'

export const getTransfers = () => getAll<unknown>(ENDPOINTS.TRANSFER)
