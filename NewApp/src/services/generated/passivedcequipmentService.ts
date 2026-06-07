// Auto-generated file. Do not edit manually.
// Service generated for /Assets/PassiveDCEquipment.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { PassiveDCEquipment } from '@/types/generated'

export type { PassiveDCEquipment } from '@/types/generated'

export const getPassivedcequipments = () =>
  getAll<PassiveDCEquipment>(ENDPOINTS.ASSETS_PASSIVEDCEQUIPMENT)

export const getPassivedcequipmentById = (id: number) =>
  getById<PassiveDCEquipment>(ENDPOINTS.ASSETS_PASSIVEDCEQUIPMENT, id)
