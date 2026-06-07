// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CartridgeItemType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { CartridgeItemType } from '@/types/generated'

export type { CartridgeItemType } from '@/types/generated'

export const getCartridgeitemtypes = () =>
  getAll<CartridgeItemType>(ENDPOINTS.DROPDOWNS_CARTRIDGEITEMTYPE)

export const getCartridgeitemtypeById = (id: number) =>
  getById<CartridgeItemType>(ENDPOINTS.DROPDOWNS_CARTRIDGEITEMTYPE, id)
