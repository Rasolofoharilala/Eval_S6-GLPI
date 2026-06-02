// Auto-generated file. Do not edit manually.
// Service generated for /Assets/PassiveDCEquipment.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPassivedcequipments = () =>
  getAll(ENDPOINTS.ASSETS_PASSIVEDCEQUIPMENT)

export const getPassivedcequipmentById = (id: number) =>
  getById(ENDPOINTS.ASSETS_PASSIVEDCEQUIPMENT, id)
