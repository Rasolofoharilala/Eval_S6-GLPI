// Auto-generated file. Do not edit manually.
// Service generated for /Setup/LDAPDirectory.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { LDAPDirectory } from '@/types/generated'

export type { LDAPDirectory } from '@/types/generated'

export const getLdapdirectories = () => getAll<LDAPDirectory>(ENDPOINTS.SETUP_LDAPDIRECTORY)

export const getLdapdirectoryById = (id: number) =>
  getById<LDAPDirectory>(ENDPOINTS.SETUP_LDAPDIRECTORY, id)
