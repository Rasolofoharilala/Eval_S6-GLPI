// Auto-generated file. Do not edit manually.
// Service generated for /Setup/OAuthClient.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { OAuthClient } from '@/types/generated'

export type { OAuthClient } from '@/types/generated'

export const getOauthclients = () => getAll<OAuthClient>(ENDPOINTS.SETUP_OAUTHCLIENT)

export const getOauthclientById = (id: number) =>
  getById<OAuthClient>(ENDPOINTS.SETUP_OAUTHCLIENT, id)
