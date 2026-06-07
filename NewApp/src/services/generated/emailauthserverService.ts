// Auto-generated file. Do not edit manually.
// Service generated for /Setup/EmailAuthServer.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { EmailAuthServer } from '@/types/generated'

export type { EmailAuthServer } from '@/types/generated'

export const getEmailauthservers = () => getAll<EmailAuthServer>(ENDPOINTS.SETUP_EMAILAUTHSERVER)

export const getEmailauthserverById = (id: number) =>
  getById<EmailAuthServer>(ENDPOINTS.SETUP_EMAILAUTHSERVER, id)
