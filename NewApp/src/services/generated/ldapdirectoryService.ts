// Auto-generated file. Do not edit manually.
// Service generated for /Setup/LDAPDirectory.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getLdapdirectories = () =>
  getAll(ENDPOINTS.SETUP_LDAPDIRECTORY)

export const getLdapdirectoryById = (id: number) =>
  getById(ENDPOINTS.SETUP_LDAPDIRECTORY, id)
