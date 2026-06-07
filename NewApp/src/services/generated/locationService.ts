// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/Location.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Location } from '@/types/generated'

export type { Location } from '@/types/generated'

export const getLocations = () => getAll<Location>(ENDPOINTS.DROPDOWNS_LOCATION)

export const getLocationById = (id: number) => getById<Location>(ENDPOINTS.DROPDOWNS_LOCATION, id)
