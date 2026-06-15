// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Cable.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { Cable } from '@/types/generated'

export type { Cable } from '@/types/generated'

export const getCables = () => getAll<Cable>(ENDPOINTS.ASSETS_CABLE)

export const getCableById = (id: number) => getById<Cable>(ENDPOINTS.ASSETS_CABLE, id)
