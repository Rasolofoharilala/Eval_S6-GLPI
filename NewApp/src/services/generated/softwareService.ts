// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Software.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getSoftwares = () =>
  getAll(ENDPOINTS.ASSETS_SOFTWARE)

export const getSoftwareById = (id: number) =>
  getById(ENDPOINTS.ASSETS_SOFTWARE, id)
