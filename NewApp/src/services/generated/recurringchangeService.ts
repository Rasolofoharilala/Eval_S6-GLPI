// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/RecurringChange.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { RecurringChange } from '@/types/generated'

export type { RecurringChange } from '@/types/generated'

export const getRecurringchanges = () =>
  getAll<RecurringChange>(ENDPOINTS.ASSISTANCE_RECURRINGCHANGE)

export const getRecurringchangeById = (id: number) =>
  getById<RecurringChange>(ENDPOINTS.ASSISTANCE_RECURRINGCHANGE, id)
