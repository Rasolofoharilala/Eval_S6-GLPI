// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DatabaseInstanceCategory.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { DatabaseInstanceCategory } from '@/types/generated'

export type { DatabaseInstanceCategory } from '@/types/generated'

export const getDatabaseinstancecategories = () =>
  getAll<DatabaseInstanceCategory>(ENDPOINTS.DROPDOWNS_DATABASEINSTANCECATEGORY)

export const getDatabaseinstancecategoryById = (id: number) =>
  getById<DatabaseInstanceCategory>(ENDPOINTS.DROPDOWNS_DATABASEINSTANCECATEGORY, id)
