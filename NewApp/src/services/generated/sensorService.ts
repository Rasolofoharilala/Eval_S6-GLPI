// Auto-generated file. Do not edit manually.
// Service generated for /Components/Sensor.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Sensor } from '@/types/generated'

export type { Sensor } from '@/types/generated'

export const getSensors = () => getAll<Sensor>(ENDPOINTS.COMPONENTS_SENSOR)

export const getSensorById = (id: number) => getById<Sensor>(ENDPOINTS.COMPONENTS_SENSOR, id)
