// Auto-generated file. Do not edit manually.
// Service generated for /Setup/EmailCollector.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { EmailCollector } from '@/types/generated'

export type { EmailCollector } from '@/types/generated'

export const getEmailcollectors = () => getAll<EmailCollector>(ENDPOINTS.SETUP_EMAILCOLLECTOR)

export const getEmailcollectorById = (id: number) =>
  getById<EmailCollector>(ENDPOINTS.SETUP_EMAILCOLLECTOR, id)
