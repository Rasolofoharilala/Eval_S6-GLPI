// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CalendarCloseTime.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getCalendarclosetimes = () =>
  getAll(ENDPOINTS.DROPDOWNS_CALENDARCLOSETIME)

export const getCalendarclosetimeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_CALENDARCLOSETIME, id)
