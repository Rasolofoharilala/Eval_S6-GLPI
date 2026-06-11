import { getAll, getById, create, update, remove } from '@/api/crudClient'

import { ENDPOINTS } from '@/generated/endpoints'

import type { Monitor, MonitorInput } from '@/types/generated'

export type { Monitor, MonitorInput } from '@/types/generated'

type RelationReference = {
  id: number
}

// L'API accepte une référence { id } pour les relations, contrairement aux
// types *Input générés (même pattern que TicketCreatePayload).
export type MonitorCreatePayload = Omit<
  MonitorInput,
  'status' | 'location' | 'manufacturer' | 'model' | 'user' | 'entity'
> & {
  status?: RelationReference
  location?: RelationReference
  manufacturer?: RelationReference
  model?: RelationReference
  user?: RelationReference
  entity?: RelationReference
}

export const getMonitors = () => getAll<Monitor>(ENDPOINTS.ASSETS_MONITOR)

export const getMonitorById = (id: number) => getById<Monitor>(ENDPOINTS.ASSETS_MONITOR, id)

export const createMonitor = (payload: MonitorCreatePayload) =>
  create<Monitor, MonitorCreatePayload>(ENDPOINTS.ASSETS_MONITOR, payload)

export const updateMonitor = (id: number, payload: MonitorInput) =>
  update<Monitor, MonitorInput>(ENDPOINTS.ASSETS_MONITOR, id, payload)

export const deleteMonitor = (id: number) => remove<Monitor>(ENDPOINTS.ASSETS_MONITOR, id)
