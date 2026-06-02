// Auto-generated file. Do not edit manually.
// Service generated for /Components/NetworkCard.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getNetworkcards = () =>
  getAll(ENDPOINTS.COMPONENTS_NETWORKCARD)

export const getNetworkcardById = (id: number) =>
  getById(ENDPOINTS.COMPONENTS_NETWORKCARD, id)
