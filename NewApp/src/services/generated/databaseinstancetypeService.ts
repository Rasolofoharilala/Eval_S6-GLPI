// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DatabaseInstanceType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { DatabaseInstanceType } from '@/types/generated'

export type { DatabaseInstanceType } from '@/types/generated'

export const getDatabaseinstancetypes = () =>
  getAll<DatabaseInstanceType>(ENDPOINTS.DROPDOWNS_DATABASEINSTANCETYPE)

export const getDatabaseinstancetypeById = (id: number) =>
  getById<DatabaseInstanceType>(ENDPOINTS.DROPDOWNS_DATABASEINSTANCETYPE, id)
