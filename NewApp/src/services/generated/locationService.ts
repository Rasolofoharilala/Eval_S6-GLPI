// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/Location.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getLocations = () =>
  getAll(ENDPOINTS.DROPDOWNS_LOCATION)

export const getLocationById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_LOCATION, id)
