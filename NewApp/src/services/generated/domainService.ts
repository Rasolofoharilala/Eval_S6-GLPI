// Auto-generated file. Do not edit manually.
// Service generated for /Management/Domain.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getDomains = () =>
  getAll(ENDPOINTS.MANAGEMENT_DOMAIN)

export const getDomainById = (id: number) =>
  getById(ENDPOINTS.MANAGEMENT_DOMAIN, id)
