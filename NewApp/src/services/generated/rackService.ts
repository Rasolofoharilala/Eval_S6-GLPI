// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Rack.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getRacks = () =>
  getAll(ENDPOINTS.ASSETS_RACK)

export const getRackById = (id: number) =>
  getById(ENDPOINTS.ASSETS_RACK, id)
