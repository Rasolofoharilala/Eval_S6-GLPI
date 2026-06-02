// Auto-generated file. Do not edit manually.
// Service generated for /Components/PCIDevice.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPcidevices = () =>
  getAll(ENDPOINTS.COMPONENTS_PCIDEVICE)

export const getPcideviceById = (id: number) =>
  getById(ENDPOINTS.COMPONENTS_PCIDEVICE, id)
