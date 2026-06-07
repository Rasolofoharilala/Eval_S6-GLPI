// Auto-generated file. Do not edit manually.
// Service generated for /Knowledgebase/Category.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { KBCategory } from '@/types/generated'

export type { KBCategory } from '@/types/generated'

export const getCategories = () => getAll<KBCategory>(ENDPOINTS.KNOWLEDGEBASE_CATEGORY)

export const getCategoryById = (id: number) =>
  getById<KBCategory>(ENDPOINTS.KNOWLEDGEBASE_CATEGORY, id)
