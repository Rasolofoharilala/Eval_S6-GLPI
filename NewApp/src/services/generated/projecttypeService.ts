// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ProjectType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getProjecttypes = () =>
  getAll(ENDPOINTS.DROPDOWNS_PROJECTTYPE)

export const getProjecttypeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_PROJECTTYPE, id)
