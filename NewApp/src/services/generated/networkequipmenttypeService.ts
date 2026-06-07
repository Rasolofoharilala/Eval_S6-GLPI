// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/NetworkEquipmentType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getNetworkequipmenttypes = () => getAll(ENDPOINTS.DROPDOWNS_NETWORKEQUIPMENTTYPE)

export const getNetworkequipmenttypeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_NETWORKEQUIPMENTTYPE, id)
