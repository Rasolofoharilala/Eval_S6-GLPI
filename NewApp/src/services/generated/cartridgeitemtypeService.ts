// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CartridgeItemType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getCartridgeitemtypes = () =>
  getAll(ENDPOINTS.DROPDOWNS_CARTRIDGEITEMTYPE)

export const getCartridgeitemtypeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_CARTRIDGEITEMTYPE, id)
