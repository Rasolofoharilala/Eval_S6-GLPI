// Auto-generated file. Do not edit manually.
// Service generated for /Setup/EmailAuthServer.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getEmailauthservers = () =>
  getAll(ENDPOINTS.SETUP_EMAILAUTHSERVER)

export const getEmailauthserverById = (id: number) =>
  getById(ENDPOINTS.SETUP_EMAILAUTHSERVER, id)
