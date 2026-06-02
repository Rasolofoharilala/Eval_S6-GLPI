// Auto-generated file. Do not edit manually.
// Service generated for /Components/PowerSupply.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPowersupplies = () =>
  getAll(ENDPOINTS.COMPONENTS_POWERSUPPLY)

export const getPowersupplyById = (id: number) =>
  getById(ENDPOINTS.COMPONENTS_POWERSUPPLY, id)
