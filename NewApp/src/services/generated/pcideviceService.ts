// Auto-generated file. Do not edit manually.
// Service generated for /Components/PCIDevice.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { PCIDevice } from '@/types/generated'

export type { PCIDevice } from '@/types/generated'

export const getPcidevices = () => getAll<PCIDevice>(ENDPOINTS.COMPONENTS_PCIDEVICE)

export const getPcideviceById = (id: number) =>
  getById<PCIDevice>(ENDPOINTS.COMPONENTS_PCIDEVICE, id)
