// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/MonitorModel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { MonitorModel } from '@/types/generated'

export type { MonitorModel } from '@/types/generated'

export const getMonitormodels = () => getAll<MonitorModel>(ENDPOINTS.DROPDOWNS_MONITORMODEL)

export const getMonitormodelById = (id: number) =>
  getById<MonitorModel>(ENDPOINTS.DROPDOWNS_MONITORMODEL, id)
