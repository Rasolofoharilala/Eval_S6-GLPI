// Auto-generated file. Do not edit manually.
// Service generated for /Administration/User/Me/Emails/Default.

import { getAll } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { EmailAddress } from '@/types/generated'

export type { EmailAddress } from '@/types/generated'

export const getDefaults = () =>
  getAll<EmailAddress>(ENDPOINTS.ADMINISTRATION_USER_ME_EMAILS_DEFAULT)
