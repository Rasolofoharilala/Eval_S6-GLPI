// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CalendarCloseTime.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { CloseTime } from '@/types/generated'

export type { CloseTime } from '@/types/generated'

export const getCalendarclosetimes = () => getAll<CloseTime>(ENDPOINTS.DROPDOWNS_CALENDARCLOSETIME)

export const getCalendarclosetimeById = (id: number) =>
  getById<CloseTime>(ENDPOINTS.DROPDOWNS_CALENDARCLOSETIME, id)
