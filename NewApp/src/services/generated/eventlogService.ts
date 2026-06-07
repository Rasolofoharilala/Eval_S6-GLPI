// Auto-generated file. Do not edit manually.
// Service generated for /Administration/EventLog.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { EventLog } from '@/types/generated'

export type { EventLog } from '@/types/generated'

export const getEventlogs = () => getAll<EventLog>(ENDPOINTS.ADMINISTRATION_EVENTLOG)

export const getEventlogById = (id: number) =>
  getById<EventLog>(ENDPOINTS.ADMINISTRATION_EVENTLOG, id)
