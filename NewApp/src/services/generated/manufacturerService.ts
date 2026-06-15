// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/Manufacturer.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { Manufacturer } from '@/types/generated'

export type { Manufacturer } from '@/types/generated'

export const getManufacturers = () => getAll<Manufacturer>(ENDPOINTS.DROPDOWNS_MANUFACTURER)

export const getManufacturerById = (id: number) =>
  getById<Manufacturer>(ENDPOINTS.DROPDOWNS_MANUFACTURER, id)
