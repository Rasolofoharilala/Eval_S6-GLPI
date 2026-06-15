// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/PeripheralType.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { PeripheralType } from '@/types/generated'

export type { PeripheralType } from '@/types/generated'

export const getPeripheraltypes = () => getAll<PeripheralType>(ENDPOINTS.DROPDOWNS_PERIPHERALTYPE)

export const getPeripheraltypeById = (id: number) =>
  getById<PeripheralType>(ENDPOINTS.DROPDOWNS_PERIPHERALTYPE, id)
