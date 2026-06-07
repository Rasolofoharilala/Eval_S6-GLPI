// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/TaskCategory.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { TaskCategory } from '@/types/generated'

export type { TaskCategory } from '@/types/generated'

export const getTaskcategories = () => getAll<TaskCategory>(ENDPOINTS.DROPDOWNS_TASKCATEGORY)

export const getTaskcategoryById = (id: number) =>
  getById<TaskCategory>(ENDPOINTS.DROPDOWNS_TASKCATEGORY, id)
