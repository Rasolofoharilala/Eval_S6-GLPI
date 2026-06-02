// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/PeripheralModel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPeripheralmodels = () =>
  getAll(ENDPOINTS.DROPDOWNS_PERIPHERALMODEL)

export const getPeripheralmodelById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_PERIPHERALMODEL, id)
