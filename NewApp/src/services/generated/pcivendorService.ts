// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/PCIVendor.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPcivendors = () => getAll(ENDPOINTS.DROPDOWNS_PCIVENDOR)

export const getPcivendorById = (id: number) => getById(ENDPOINTS.DROPDOWNS_PCIVENDOR, id)
