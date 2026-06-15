// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ConsumableItemType.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { ConsumableItemType } from '@/types/generated'

export type { ConsumableItemType } from '@/types/generated'

export const getConsumableitemtypes = () =>
  getAll<ConsumableItemType>(ENDPOINTS.DROPDOWNS_CONSUMABLEITEMTYPE)

export const getConsumableitemtypeById = (id: number) =>
  getById<ConsumableItemType>(ENDPOINTS.DROPDOWNS_CONSUMABLEITEMTYPE, id)
