import { getAll, getById, create, update, remove } from '@/api/crudClient'

import { ENDPOINTS } from '@/generated/endpoints'

import type { Computer, ComputerInput } from '@/types/generated'

export type { Computer, ComputerInput } from '@/types/generated'

export const getComputers = () => getAll<Computer>(ENDPOINTS.ASSETS_COMPUTER)

export const getComputerById = (id: number) => getById<Computer>(ENDPOINTS.ASSETS_COMPUTER, id)

export const createComputer = (payload: ComputerInput) =>
  create<Computer, ComputerInput>(ENDPOINTS.ASSETS_COMPUTER, payload)

export const updateComputer = (id: number, payload: ComputerInput) =>
  update<Computer, ComputerInput>(ENDPOINTS.ASSETS_COMPUTER, id, payload)

export const deleteComputer = (id: number) => remove<Computer>(ENDPOINTS.ASSETS_COMPUTER, id)
