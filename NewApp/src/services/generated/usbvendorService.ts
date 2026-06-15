// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/USBVendor.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { USBVendor } from '@/types/generated'

export type { USBVendor } from '@/types/generated'

export const getUsbvendors = () => getAll<USBVendor>(ENDPOINTS.DROPDOWNS_USBVENDOR)

export const getUsbvendorById = (id: number) =>
  getById<USBVendor>(ENDPOINTS.DROPDOWNS_USBVENDOR, id)
