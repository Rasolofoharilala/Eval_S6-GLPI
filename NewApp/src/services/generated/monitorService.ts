// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Monitor.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getMonitors = () =>
  getAll(ENDPOINTS.ASSETS_MONITOR)

export const getMonitorById = (id: number) =>
  getById(ENDPOINTS.ASSETS_MONITOR, id)
