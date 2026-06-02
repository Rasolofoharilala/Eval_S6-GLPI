// Auto-generated file. Do not edit manually.
// Service generated for /Assets/NetworkEquipment.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getNetworkequipments = () =>
  getAll(ENDPOINTS.ASSETS_NETWORKEQUIPMENT)

export const getNetworkequipmentById = (id: number) =>
  getById(ENDPOINTS.ASSETS_NETWORKEQUIPMENT, id)
