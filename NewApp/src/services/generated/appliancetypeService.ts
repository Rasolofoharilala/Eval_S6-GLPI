// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ApplianceType.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { ApplianceType } from '@/types/generated'

export type { ApplianceType } from '@/types/generated'

export const getAppliancetypes = () => getAll<ApplianceType>(ENDPOINTS.DROPDOWNS_APPLIANCETYPE)

export const getAppliancetypeById = (id: number) =>
  getById<ApplianceType>(ENDPOINTS.DROPDOWNS_APPLIANCETYPE, id)
