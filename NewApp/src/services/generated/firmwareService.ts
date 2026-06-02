// Auto-generated file. Do not edit manually.
// Service generated for /Components/Firmware.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getFirmwares = () =>
  getAll(ENDPOINTS.COMPONENTS_FIRMWARE)

export const getFirmwareById = (id: number) =>
  getById(ENDPOINTS.COMPONENTS_FIRMWARE, id)
