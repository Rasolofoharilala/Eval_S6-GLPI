// Auto-generated file. Do not edit manually.
// Service generated for /Components/Battery.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getBatteries = () =>
  getAll(ENDPOINTS.COMPONENTS_BATTERY)

export const getBatteryById = (id: number) =>
  getById(ENDPOINTS.COMPONENTS_BATTERY, id)
