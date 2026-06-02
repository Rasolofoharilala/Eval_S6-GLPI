// Auto-generated file. Do not edit manually.
// Service generated for /Setup/OAuthClient.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getOauthclients = () =>
  getAll(ENDPOINTS.SETUP_OAUTHCLIENT)

export const getOauthclientById = (id: number) =>
  getById(ENDPOINTS.SETUP_OAUTHCLIENT, id)
