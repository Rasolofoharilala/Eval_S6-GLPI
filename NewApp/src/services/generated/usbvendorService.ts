// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/USBVendor.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getUsbvendors = () =>
  getAll(ENDPOINTS.DROPDOWNS_USBVENDOR)

export const getUsbvendorById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_USBVENDOR, id)
