// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Consumable.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { ConsumableItem } from '@/types/generated'

export type { ConsumableItem } from '@/types/generated'

export const getConsumables = () => getAll<ConsumableItem>(ENDPOINTS.ASSETS_CONSUMABLE)

export const getConsumableById = (id: number) =>
  getById<ConsumableItem>(ENDPOINTS.ASSETS_CONSUMABLE, id)
