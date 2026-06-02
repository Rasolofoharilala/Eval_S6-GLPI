// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/PendingReason.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPendingreasons = () =>
  getAll(ENDPOINTS.ASSISTANCE_PENDINGREASON)

export const getPendingreasonById = (id: number) =>
  getById(ENDPOINTS.ASSISTANCE_PENDINGREASON, id)
