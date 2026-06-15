// Auto-generated file. Do not edit manually.
// Service generated for /Components/Battery.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { Battery } from '@/types/generated'

export type { Battery } from '@/types/generated'

export const getBatteries = () => getAll<Battery>(ENDPOINTS.COMPONENTS_BATTERY)

export const getBatteryById = (id: number) => getById<Battery>(ENDPOINTS.COMPONENTS_BATTERY, id)
