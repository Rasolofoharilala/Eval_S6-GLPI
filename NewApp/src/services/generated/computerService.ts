import { getAll, getById, create, update, remove } from '@/api/crudClient'

import { ENDPOINTS } from '@/generated/endpoints'

import type { Computer, ComputerInput } from '@/types/generated'

export type { Computer, ComputerInput } from '@/types/generated'

type RelationReference = {
  id: number
}

// L'API accepte une référence { id } pour les relations, contrairement aux
// types *Input générés (même pattern que TicketCreatePayload).
export type ComputerCreatePayload = Omit<
  ComputerInput,
  'status' | 'location' | 'manufacturer' | 'model' | 'user' | 'entity'
> & {
  status?: RelationReference
  location?: RelationReference
  manufacturer?: RelationReference
  model?: RelationReference
  user?: RelationReference
  entity?: RelationReference
}

export const getComputers = () => getAll<Computer>(ENDPOINTS.ASSETS_COMPUTER)

export const getComputerById = (id: number) => getById<Computer>(ENDPOINTS.ASSETS_COMPUTER, id)

export const createComputer = (payload: ComputerCreatePayload) =>
  create<Computer, ComputerCreatePayload>(ENDPOINTS.ASSETS_COMPUTER, payload)

export const updateComputer = (id: number, payload: ComputerInput) =>
  update<Computer, ComputerInput>(ENDPOINTS.ASSETS_COMPUTER, id, payload)

export const deleteComputer = (id: number) => remove<Computer>(ENDPOINTS.ASSETS_COMPUTER, id)
