// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CableStrand.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { CableStrand } from '@/types/generated'

export type { CableStrand } from '@/types/generated'

export const getCablestrands = () => getAll<CableStrand>(ENDPOINTS.DROPDOWNS_CABLESTRAND)

export const getCablestrandById = (id: number) =>
  getById<CableStrand>(ENDPOINTS.DROPDOWNS_CABLESTRAND, id)
