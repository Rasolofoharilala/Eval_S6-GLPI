// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CalendarTimeRange.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { CalendarTimeRange } from '@/types/generated'

export type { CalendarTimeRange } from '@/types/generated'

export const getCalendartimeranges = () =>
  getAll<CalendarTimeRange>(ENDPOINTS.DROPDOWNS_CALENDARTIMERANGE)

export const getCalendartimerangeById = (id: number) =>
  getById<CalendarTimeRange>(ENDPOINTS.DROPDOWNS_CALENDARTIMERANGE, id)
