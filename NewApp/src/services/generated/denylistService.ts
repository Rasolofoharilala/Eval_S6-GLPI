// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DenyList.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getDenylists = () =>
  getAll(ENDPOINTS.DROPDOWNS_DENYLIST)

export const getDenylistById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_DENYLIST, id)
