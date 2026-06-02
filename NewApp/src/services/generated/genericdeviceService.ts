// Auto-generated file. Do not edit manually.
// Service generated for /Components/GenericDevice.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getGenericdevices = () =>
  getAll(ENDPOINTS.COMPONENTS_GENERICDEVICE)

export const getGenericdeviceById = (id: number) =>
  getById(ENDPOINTS.COMPONENTS_GENERICDEVICE, id)
