// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Enclosure.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getEnclosures = () => getAll(ENDPOINTS.ASSETS_ENCLOSURE)

export const getEnclosureById = (id: number) => getById(ENDPOINTS.ASSETS_ENCLOSURE, id)
