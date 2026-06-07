// Auto-generated file. Do not edit manually.
// Service generated for /Setup/LDAPDirectoryReplicate.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { LDAPDirectoryReplicate } from '@/types/generated'

export type { LDAPDirectoryReplicate } from '@/types/generated'

export const getLdapdirectoryreplicates = () =>
  getAll<LDAPDirectoryReplicate>(ENDPOINTS.SETUP_LDAPDIRECTORYREPLICATE)

export const getLdapdirectoryreplicateById = (id: number) =>
  getById<LDAPDirectoryReplicate>(ENDPOINTS.SETUP_LDAPDIRECTORYREPLICATE, id)
