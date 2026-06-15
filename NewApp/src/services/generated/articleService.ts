// Auto-generated file. Do not edit manually.
// Service generated for /Knowledgebase/Article.

import { getAll } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { KBArticle } from '@/types/generated'

export type { KBArticle } from '@/types/generated'

export const getArticles = () => getAll<KBArticle>(ENDPOINTS.KNOWLEDGEBASE_ARTICLE)
