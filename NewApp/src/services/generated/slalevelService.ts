// Auto-generated file. Do not edit manually.
// Service generated for /Setup/SLALevel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { SLALevel } from '@/types/generated'

export type { SLALevel } from '@/types/generated'

export const getSlalevels = () => getAll<SLALevel>(ENDPOINTS.SETUP_SLALEVEL)

export const getSlalevelById = (id: number) => getById<SLALevel>(ENDPOINTS.SETUP_SLALEVEL, id)
