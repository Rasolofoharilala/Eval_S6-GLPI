// Auto-generated file. Do not edit manually.
// Service generated for /Components/Sensor.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getSensors = () =>
  getAll(ENDPOINTS.COMPONENTS_SENSOR)

export const getSensorById = (id: number) =>
  getById(ENDPOINTS.COMPONENTS_SENSOR, id)
