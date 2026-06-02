// Auto-generated file. Do not edit manually.
// Service generated for /Setup/ExternalLink.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getExternallinks = () =>
  getAll(ENDPOINTS.SETUP_EXTERNALLINK)

export const getExternallinkById = (id: number) =>
  getById(ENDPOINTS.SETUP_EXTERNALLINK, id)
