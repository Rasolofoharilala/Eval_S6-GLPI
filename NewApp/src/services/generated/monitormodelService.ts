// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/MonitorModel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getMonitormodels = () =>
  getAll(ENDPOINTS.DROPDOWNS_MONITORMODEL)

export const getMonitormodelById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_MONITORMODEL, id)
