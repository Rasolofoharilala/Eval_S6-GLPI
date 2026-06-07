// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/Calendar.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Calendar } from '@/types/generated'

export type { Calendar } from '@/types/generated'

export const getCalendars = () => getAll<Calendar>(ENDPOINTS.DROPDOWNS_CALENDAR)

export const getCalendarById = (id: number) => getById<Calendar>(ENDPOINTS.DROPDOWNS_CALENDAR, id)
