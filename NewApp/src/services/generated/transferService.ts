// Auto-generated file. Do not edit manually.
// Service generated for /Transfer.

import { getAll } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getTransfers = () => getAll<unknown>(ENDPOINTS.TRANSFER)
