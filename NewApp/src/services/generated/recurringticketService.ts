// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/RecurringTicket.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { RecurringTicket } from '@/types/generated'

export type { RecurringTicket } from '@/types/generated'

export const getRecurringtickets = () =>
  getAll<RecurringTicket>(ENDPOINTS.ASSISTANCE_RECURRINGTICKET)

export const getRecurringticketById = (id: number) =>
  getById<RecurringTicket>(ENDPOINTS.ASSISTANCE_RECURRINGTICKET, id)
