// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Peripheral.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Peripheral } from '@/types/generated'

export type { Peripheral } from '@/types/generated'

export const getPeripherals = () => getAll<Peripheral>(ENDPOINTS.ASSETS_PERIPHERAL)

export const getPeripheralById = (id: number) =>
  getById<Peripheral>(ENDPOINTS.ASSETS_PERIPHERAL, id)
