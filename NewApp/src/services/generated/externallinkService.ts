// Auto-generated file. Do not edit manually.
// Service generated for /Setup/ExternalLink.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { ExternalLink } from '@/types/generated'

export type { ExternalLink } from '@/types/generated'

export const getExternallinks = () => getAll<ExternalLink>(ENDPOINTS.SETUP_EXTERNALLINK)

export const getExternallinkById = (id: number) =>
  getById<ExternalLink>(ENDPOINTS.SETUP_EXTERNALLINK, id)
