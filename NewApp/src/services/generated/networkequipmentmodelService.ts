// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/NetworkEquipmentModel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { NetworkEquipmentModel } from '@/types/generated'

export type { NetworkEquipmentModel } from '@/types/generated'

export const getNetworkequipmentmodels = () =>
  getAll<NetworkEquipmentModel>(ENDPOINTS.DROPDOWNS_NETWORKEQUIPMENTMODEL)

export const getNetworkequipmentmodelById = (id: number) =>
  getById<NetworkEquipmentModel>(ENDPOINTS.DROPDOWNS_NETWORKEQUIPMENTMODEL, id)
