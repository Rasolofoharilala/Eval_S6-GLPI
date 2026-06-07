// Auto-generated file. Do not edit manually.
// Service generated for /Components/PowerSupply.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { PowerSupply } from '@/types/generated'

export type { PowerSupply } from '@/types/generated'

export const getPowersupplies = () => getAll<PowerSupply>(ENDPOINTS.COMPONENTS_POWERSUPPLY)

export const getPowersupplyById = (id: number) =>
  getById<PowerSupply>(ENDPOINTS.COMPONENTS_POWERSUPPLY, id)
