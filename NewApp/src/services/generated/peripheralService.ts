// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Peripheral.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPeripherals = () => getAll(ENDPOINTS.ASSETS_PERIPHERAL)

export const getPeripheralById = (id: number) => getById(ENDPOINTS.ASSETS_PERIPHERAL, id)
