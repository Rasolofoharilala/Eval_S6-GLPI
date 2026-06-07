// Auto-generated file. Do not edit manually.
// Service generated for /Administration/User/Me/Email.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { EmailAddress } from '@/types/generated'

export type { EmailAddress } from '@/types/generated'

export const getEmails = () => getAll<EmailAddress>(ENDPOINTS.ADMINISTRATION_USER_ME_EMAIL)

export const getEmailById = (id: number) =>
  getById<EmailAddress>(ENDPOINTS.ADMINISTRATION_USER_ME_EMAIL, id)
