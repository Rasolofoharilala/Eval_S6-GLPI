// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/TaskCategory.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getTaskcategories = () => getAll(ENDPOINTS.DROPDOWNS_TASKCATEGORY)

export const getTaskcategoryById = (id: number) => getById(ENDPOINTS.DROPDOWNS_TASKCATEGORY, id)
