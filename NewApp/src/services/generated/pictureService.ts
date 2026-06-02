// Auto-generated file. Do not edit manually.
// Service generated for /Administration/User/Me/Picture.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPictures = () =>
  getAll(ENDPOINTS.ADMINISTRATION_USER_ME_PICTURE)
