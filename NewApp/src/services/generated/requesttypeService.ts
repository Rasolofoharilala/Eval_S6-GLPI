// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/RequestType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getRequesttypes = () =>
  getAll(ENDPOINTS.DROPDOWNS_REQUESTTYPE)

export const getRequesttypeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_REQUESTTYPE, id)
