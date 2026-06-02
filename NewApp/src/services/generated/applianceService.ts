// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Appliance.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getAppliances = () =>
  getAll(ENDPOINTS.ASSETS_APPLIANCE)

export const getApplianceById = (id: number) =>
  getById(ENDPOINTS.ASSETS_APPLIANCE, id)
