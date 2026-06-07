// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/PCIVendor.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { PCIVendor } from '@/types/generated'

export type { PCIVendor } from '@/types/generated'

export const getPcivendors = () => getAll<PCIVendor>(ENDPOINTS.DROPDOWNS_PCIVENDOR)

export const getPcivendorById = (id: number) =>
  getById<PCIVendor>(ENDPOINTS.DROPDOWNS_PCIVENDOR, id)
