// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/RecurringChange.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getRecurringchanges = () =>
  getAll(ENDPOINTS.ASSISTANCE_RECURRINGCHANGE)

export const getRecurringchangeById = (id: number) =>
  getById(ENDPOINTS.ASSISTANCE_RECURRINGCHANGE, id)
