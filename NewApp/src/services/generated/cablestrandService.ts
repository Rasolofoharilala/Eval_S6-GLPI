// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CableStrand.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getCablestrands = () =>
  getAll(ENDPOINTS.DROPDOWNS_CABLESTRAND)

export const getCablestrandById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_CABLESTRAND, id)
