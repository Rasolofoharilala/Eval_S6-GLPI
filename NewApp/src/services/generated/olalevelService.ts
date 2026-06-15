// Auto-generated file. Do not edit manually.
// Service generated for /Setup/OLALevel.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { OLALevel } from '@/types/generated'

export type { OLALevel } from '@/types/generated'

export const getOlalevels = () => getAll<OLALevel>(ENDPOINTS.SETUP_OLALEVEL)

export const getOlalevelById = (id: number) => getById<OLALevel>(ENDPOINTS.SETUP_OLALEVEL, id)
