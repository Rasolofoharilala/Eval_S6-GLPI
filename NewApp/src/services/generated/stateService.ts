// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/State.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getStates = () =>
  getAll(ENDPOINTS.DROPDOWNS_STATE)

export const getStateById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_STATE, id)
