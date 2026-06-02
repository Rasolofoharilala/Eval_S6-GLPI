// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/Calendar.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getCalendars = () =>
  getAll(ENDPOINTS.DROPDOWNS_CALENDAR)

export const getCalendarById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_CALENDAR, id)
