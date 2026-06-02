// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/BusinessCriticity.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getBusinesscriticities = () =>
  getAll(ENDPOINTS.DROPDOWNS_BUSINESSCRITICITY)

export const getBusinesscriticityById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_BUSINESSCRITICITY, id)
