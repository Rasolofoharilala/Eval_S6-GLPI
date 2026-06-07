// Auto-generated file. Do not edit manually.
// Service generated for /Tools/RSSFeed.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { RSSFeed } from '@/types/generated'

export type { RSSFeed } from '@/types/generated'

export const getRssfeeds = () => getAll<RSSFeed>(ENDPOINTS.TOOLS_RSSFEED)

export const getRssfeedById = (id: number) => getById<RSSFeed>(ENDPOINTS.TOOLS_RSSFEED, id)
