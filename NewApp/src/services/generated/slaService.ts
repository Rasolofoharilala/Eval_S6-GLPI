// Auto-generated file. Do not edit manually.
// Service generated for /Setup/SLA.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getSlas = () => getAll(ENDPOINTS.SETUP_SLA)

export const getSlaById = (id: number) => getById(ENDPOINTS.SETUP_SLA, id)
