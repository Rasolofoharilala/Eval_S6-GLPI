// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/NetworkEquipmentType.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { NetworkEquipmentType } from '@/types/generated'

export type { NetworkEquipmentType } from '@/types/generated'

export const getNetworkequipmenttypes = () =>
  getAll<NetworkEquipmentType>(ENDPOINTS.DROPDOWNS_NETWORKEQUIPMENTTYPE)

export const getNetworkequipmenttypeById = (id: number) =>
  getById<NetworkEquipmentType>(ENDPOINTS.DROPDOWNS_NETWORKEQUIPMENTTYPE, id)
