// Auto-generated file. Do not edit manually.
// Service generated for /Administration/UserCategory.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { UserCategory } from '@/types/generated'

export type { UserCategory } from '@/types/generated'

export const getUsercategories = () => getAll<UserCategory>(ENDPOINTS.ADMINISTRATION_USERCATEGORY)

export const getUsercategoryById = (id: number) =>
  getById<UserCategory>(ENDPOINTS.ADMINISTRATION_USERCATEGORY, id)
