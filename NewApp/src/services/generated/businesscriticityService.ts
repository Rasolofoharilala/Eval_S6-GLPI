// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/BusinessCriticity.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { BusinessCriticity } from '@/types/generated'

export type { BusinessCriticity } from '@/types/generated'

export const getBusinesscriticities = () =>
  getAll<BusinessCriticity>(ENDPOINTS.DROPDOWNS_BUSINESSCRITICITY)

export const getBusinesscriticityById = (id: number) =>
  getById<BusinessCriticity>(ENDPOINTS.DROPDOWNS_BUSINESSCRITICITY, id)
