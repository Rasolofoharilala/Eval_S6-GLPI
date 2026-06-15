// Auto-generated file. Do not edit manually.
// Service generated for /Setup/SLA.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { SLA } from '@/types/generated'

export type { SLA } from '@/types/generated'

export const getSlas = () => getAll<SLA>(ENDPOINTS.SETUP_SLA)

export const getSlaById = (id: number) => getById<SLA>(ENDPOINTS.SETUP_SLA, id)
