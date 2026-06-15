// Auto-generated file. Do not edit manually.
// Service generated for /Assets/NetworkEquipment.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { NetworkEquipment } from '@/types/generated'

export type { NetworkEquipment } from '@/types/generated'

export const getNetworkequipments = () =>
  getAll<NetworkEquipment>(ENDPOINTS.ASSETS_NETWORKEQUIPMENT)

export const getNetworkequipmentById = (id: number) =>
  getById<NetworkEquipment>(ENDPOINTS.ASSETS_NETWORKEQUIPMENT, id)
