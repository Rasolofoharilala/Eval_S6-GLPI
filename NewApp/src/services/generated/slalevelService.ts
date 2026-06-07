// Auto-generated file. Do not edit manually.
// Service generated for /Setup/SLALevel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getSlalevels = () => getAll(ENDPOINTS.SETUP_SLALEVEL)

export const getSlalevelById = (id: number) => getById(ENDPOINTS.SETUP_SLALEVEL, id)
