// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DatabaseInstanceCategory.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getDatabaseinstancecategories = () =>
  getAll(ENDPOINTS.DROPDOWNS_DATABASEINSTANCECATEGORY)

export const getDatabaseinstancecategoryById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_DATABASEINSTANCECATEGORY, id)
