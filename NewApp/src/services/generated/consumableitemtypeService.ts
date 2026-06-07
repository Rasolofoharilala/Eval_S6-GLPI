// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ConsumableItemType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getConsumableitemtypes = () => getAll(ENDPOINTS.DROPDOWNS_CONSUMABLEITEMTYPE)

export const getConsumableitemtypeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_CONSUMABLEITEMTYPE, id)
