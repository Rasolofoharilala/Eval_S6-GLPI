// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Cable.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getCables = () =>
  getAll(ENDPOINTS.ASSETS_CABLE)

export const getCableById = (id: number) =>
  getById(ENDPOINTS.ASSETS_CABLE, id)
