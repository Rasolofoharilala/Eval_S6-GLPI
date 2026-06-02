// Auto-generated file. Do not edit manually.
// Service generated for /Setup/EmailCollector.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getEmailcollectors = () =>
  getAll(ENDPOINTS.SETUP_EMAILCOLLECTOR)

export const getEmailcollectorById = (id: number) =>
  getById(ENDPOINTS.SETUP_EMAILCOLLECTOR, id)
