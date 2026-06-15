// Auto-generated file. Do not edit manually.
// Service generated for /Components/GenericDevice.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { GenericDevice } from '@/types/generated'

export type { GenericDevice } from '@/types/generated'

export const getGenericdevices = () => getAll<GenericDevice>(ENDPOINTS.COMPONENTS_GENERICDEVICE)

export const getGenericdeviceById = (id: number) =>
  getById<GenericDevice>(ENDPOINTS.COMPONENTS_GENERICDEVICE, id)
