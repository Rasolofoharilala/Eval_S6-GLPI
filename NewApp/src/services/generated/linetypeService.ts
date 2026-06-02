// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/LineType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getLinetypes = () =>
  getAll(ENDPOINTS.DROPDOWNS_LINETYPE)

export const getLinetypeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_LINETYPE, id)
