// Auto-generated file. Do not edit manually.
// Service generated for /Administration/User/Me.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getMes = () =>
  getAll(ENDPOINTS.ADMINISTRATION_USER_ME)
