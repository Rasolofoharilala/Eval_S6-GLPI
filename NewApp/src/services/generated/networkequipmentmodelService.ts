// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/NetworkEquipmentModel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getNetworkequipmentmodels = () =>
  getAll(ENDPOINTS.DROPDOWNS_NETWORKEQUIPMENTMODEL)

export const getNetworkequipmentmodelById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_NETWORKEQUIPMENTMODEL, id)
