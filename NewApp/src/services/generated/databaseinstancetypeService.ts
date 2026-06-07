// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DatabaseInstanceType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getDatabaseinstancetypes = () => getAll(ENDPOINTS.DROPDOWNS_DATABASEINSTANCETYPE)

export const getDatabaseinstancetypeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_DATABASEINSTANCETYPE, id)
