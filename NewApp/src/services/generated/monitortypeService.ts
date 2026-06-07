// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/MonitorType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { MonitorType } from '@/types/generated'

export type { MonitorType } from '@/types/generated'

export const getMonitortypes = () => getAll<MonitorType>(ENDPOINTS.DROPDOWNS_MONITORTYPE)

export const getMonitortypeById = (id: number) =>
  getById<MonitorType>(ENDPOINTS.DROPDOWNS_MONITORTYPE, id)
