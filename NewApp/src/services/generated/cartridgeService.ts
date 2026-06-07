// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Cartridge.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { CartridgeItem } from '@/types/generated'

export type { CartridgeItem } from '@/types/generated'

export const getCartridges = () => getAll<CartridgeItem>(ENDPOINTS.ASSETS_CARTRIDGE)

export const getCartridgeById = (id: number) =>
  getById<CartridgeItem>(ENDPOINTS.ASSETS_CARTRIDGE, id)
