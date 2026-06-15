// Auto-generated file. Do not edit manually.
// Service generated for /Administration/UserTitle.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { UserTitle } from '@/types/generated'

export type { UserTitle } from '@/types/generated'

export const getUsertitles = () => getAll<UserTitle>(ENDPOINTS.ADMINISTRATION_USERTITLE)

export const getUsertitleById = (id: number) =>
  getById<UserTitle>(ENDPOINTS.ADMINISTRATION_USERTITLE, id)
