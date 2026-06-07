// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CalendarTimeRange.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getCalendartimeranges = () => getAll(ENDPOINTS.DROPDOWNS_CALENDARTIMERANGE)

export const getCalendartimerangeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_CALENDARTIMERANGE, id)
