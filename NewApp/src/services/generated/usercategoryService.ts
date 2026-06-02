// Auto-generated file. Do not edit manually.
// Service generated for /Administration/UserCategory.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getUsercategories = () =>
  getAll(ENDPOINTS.ADMINISTRATION_USERCATEGORY)

export const getUsercategoryById = (id: number) =>
  getById(ENDPOINTS.ADMINISTRATION_USERCATEGORY, id)
