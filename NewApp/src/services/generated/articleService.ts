// Auto-generated file. Do not edit manually.
// Service generated for /Knowledgebase/Article.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getArticles = () => getAll(ENDPOINTS.KNOWLEDGEBASE_ARTICLE)
