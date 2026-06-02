// Auto-generated file. Do not edit manually.
// Service generated for /Knowledgebase/Category.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getCategories = () =>
  getAll(ENDPOINTS.KNOWLEDGEBASE_CATEGORY)

export const getCategoryById = (id: number) =>
  getById(ENDPOINTS.KNOWLEDGEBASE_CATEGORY, id)
