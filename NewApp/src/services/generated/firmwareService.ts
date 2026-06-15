// Auto-generated file. Do not edit manually.
// Service generated for /Components/Firmware.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { Firmware } from '@/types/generated'

export type { Firmware } from '@/types/generated'

export const getFirmwares = () => getAll<Firmware>(ENDPOINTS.COMPONENTS_FIRMWARE)

export const getFirmwareById = (id: number) => getById<Firmware>(ENDPOINTS.COMPONENTS_FIRMWARE, id)
