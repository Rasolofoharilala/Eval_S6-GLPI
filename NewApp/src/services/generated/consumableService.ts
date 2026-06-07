// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Consumable.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getConsumables = () => getAll(ENDPOINTS.ASSETS_CONSUMABLE)

export const getConsumableById = (id: number) => getById(ENDPOINTS.ASSETS_CONSUMABLE, id)
