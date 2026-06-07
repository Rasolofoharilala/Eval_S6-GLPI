// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Appliance.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Appliance } from '@/types/generated'

export type { Appliance } from '@/types/generated'

export const getAppliances = () => getAll<Appliance>(ENDPOINTS.ASSETS_APPLIANCE)

export const getApplianceById = (id: number) => getById<Appliance>(ENDPOINTS.ASSETS_APPLIANCE, id)
