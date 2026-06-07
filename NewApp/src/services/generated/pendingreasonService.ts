// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/PendingReason.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { PendingReason } from '@/types/generated'

export type { PendingReason } from '@/types/generated'

export const getPendingreasons = () => getAll<PendingReason>(ENDPOINTS.ASSISTANCE_PENDINGREASON)

export const getPendingreasonById = (id: number) =>
  getById<PendingReason>(ENDPOINTS.ASSISTANCE_PENDINGREASON, id)
