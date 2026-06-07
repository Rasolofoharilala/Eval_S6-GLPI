import { getAll, getById, create, update, remove } from '@/api/crudClient'

import { ENDPOINTS } from '@/generated/endpoints'

import type { Monitor, MonitorInput } from '@/types/generated'

export type { Monitor, MonitorInput } from '@/types/generated'

export const getMonitors = () => getAll<Monitor>(ENDPOINTS.ASSETS_MONITOR)

export const getMonitorById = (id: number) => getById<Monitor>(ENDPOINTS.ASSETS_MONITOR, id)

export const createMonitor = (payload: MonitorInput) =>
  create<Monitor, MonitorInput>(ENDPOINTS.ASSETS_MONITOR, payload)

export const updateMonitor = (id: number, payload: MonitorInput) =>
  update<Monitor, MonitorInput>(ENDPOINTS.ASSETS_MONITOR, id, payload)

export const deleteMonitor = (id: number) => remove<Monitor>(ENDPOINTS.ASSETS_MONITOR, id)
