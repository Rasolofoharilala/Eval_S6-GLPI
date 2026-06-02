// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/Manufacturer.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getManufacturers = () =>
  getAll(ENDPOINTS.DROPDOWNS_MANUFACTURER)

export const getManufacturerById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_MANUFACTURER, id)
