// Auto-generated file. Do not edit manually.
// Service generated for /Setup/OLA.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { OLA } from '@/types/generated'

export type { OLA } from '@/types/generated'

export const getOlas = () => getAll<OLA>(ENDPOINTS.SETUP_OLA)

export const getOlaById = (id: number) => getById<OLA>(ENDPOINTS.SETUP_OLA, id)
