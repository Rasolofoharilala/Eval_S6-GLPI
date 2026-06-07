// Auto-generated file. Do not edit manually.
// Service generated for /Administration/UserTitle.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getUsertitles = () => getAll(ENDPOINTS.ADMINISTRATION_USERTITLE)

export const getUsertitleById = (id: number) => getById(ENDPOINTS.ADMINISTRATION_USERTITLE, id)
