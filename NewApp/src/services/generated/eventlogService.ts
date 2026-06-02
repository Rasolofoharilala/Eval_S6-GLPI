// Auto-generated file. Do not edit manually.
// Service generated for /Administration/EventLog.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getEventlogs = () =>
  getAll(ENDPOINTS.ADMINISTRATION_EVENTLOG)

export const getEventlogById = (id: number) =>
  getById(ENDPOINTS.ADMINISTRATION_EVENTLOG, id)
