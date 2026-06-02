// Auto-generated file. Do not edit manually.
// Service generated for /Setup/LDAPDirectoryReplicate.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getLdapdirectoryreplicates = () =>
  getAll(ENDPOINTS.SETUP_LDAPDIRECTORYREPLICATE)

export const getLdapdirectoryreplicateById = (id: number) =>
  getById(ENDPOINTS.SETUP_LDAPDIRECTORYREPLICATE, id)
