// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ITILCategory.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getItilcategories = () => getAll(ENDPOINTS.DROPDOWNS_ITILCATEGORY)

export const getItilcategoryById = (id: number) => getById(ENDPOINTS.DROPDOWNS_ITILCATEGORY, id)
