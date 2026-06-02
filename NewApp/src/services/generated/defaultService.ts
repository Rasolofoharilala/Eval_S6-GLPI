// Auto-generated file. Do not edit manually.
// Service generated for /Administration/User/Me/Emails/Default.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getDefaults = () =>
  getAll(ENDPOINTS.ADMINISTRATION_USER_ME_EMAILS_DEFAULT)
