// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/PeripheralModel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { PeripheralModel } from '@/types/generated'

export type { PeripheralModel } from '@/types/generated'

export const getPeripheralmodels = () =>
  getAll<PeripheralModel>(ENDPOINTS.DROPDOWNS_PERIPHERALMODEL)

export const getPeripheralmodelById = (id: number) =>
  getById<PeripheralModel>(ENDPOINTS.DROPDOWNS_PERIPHERALMODEL, id)
