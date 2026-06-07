// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ITILCategory.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { ITILCategory } from '@/types/generated'

export type { ITILCategory } from '@/types/generated'

export const getItilcategories = () => getAll<ITILCategory>(ENDPOINTS.DROPDOWNS_ITILCATEGORY)

export const getItilcategoryById = (id: number) =>
  getById<ITILCategory>(ENDPOINTS.DROPDOWNS_ITILCATEGORY, id)
