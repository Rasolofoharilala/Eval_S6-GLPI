// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Enclosure.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Enclosure } from '@/types/generated'

export type { Enclosure } from '@/types/generated'

export const getEnclosures = () => getAll<Enclosure>(ENDPOINTS.ASSETS_ENCLOSURE)

export const getEnclosureById = (id: number) => getById<Enclosure>(ENDPOINTS.ASSETS_ENCLOSURE, id)
