// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/RecurringTicket.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getRecurringtickets = () =>
  getAll(ENDPOINTS.ASSISTANCE_RECURRINGTICKET)

export const getRecurringticketById = (id: number) =>
  getById(ENDPOINTS.ASSISTANCE_RECURRINGTICKET, id)
