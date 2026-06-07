// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/RequestType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { RequestType } from '@/types/generated'

export type { RequestType } from '@/types/generated'

export const getRequesttypes = () => getAll<RequestType>(ENDPOINTS.DROPDOWNS_REQUESTTYPE)

export const getRequesttypeById = (id: number) =>
  getById<RequestType>(ENDPOINTS.DROPDOWNS_REQUESTTYPE, id)
