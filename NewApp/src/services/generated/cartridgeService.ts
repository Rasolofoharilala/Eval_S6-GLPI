// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Cartridge.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getCartridges = () => getAll(ENDPOINTS.ASSETS_CARTRIDGE)

export const getCartridgeById = (id: number) => getById(ENDPOINTS.ASSETS_CARTRIDGE, id)
