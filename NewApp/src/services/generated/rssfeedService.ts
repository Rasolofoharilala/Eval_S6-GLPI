// Auto-generated file. Do not edit manually.
// Service generated for /Tools/RSSFeed.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getRssfeeds = () =>
  getAll(ENDPOINTS.TOOLS_RSSFEED)

export const getRssfeedById = (id: number) =>
  getById(ENDPOINTS.TOOLS_RSSFEED, id)
