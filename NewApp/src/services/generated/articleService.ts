// Auto-generated file. Do not edit manually.
// Service generated for /Knowledgebase/Article.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { KBArticle } from '@/types/generated'

export type { KBArticle } from '@/types/generated'

export const getArticles = () => getAll<KBArticle>(ENDPOINTS.KNOWLEDGEBASE_ARTICLE)
