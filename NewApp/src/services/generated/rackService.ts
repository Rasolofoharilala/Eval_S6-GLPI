// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Rack.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { Rack } from '@/types/generated'

export type { Rack } from '@/types/generated'

export const getRacks = () => getAll<Rack>(ENDPOINTS.ASSETS_RACK)

export const getRackById = (id: number) => getById<Rack>(ENDPOINTS.ASSETS_RACK, id)
