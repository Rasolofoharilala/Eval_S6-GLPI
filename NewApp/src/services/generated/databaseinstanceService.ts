// Auto-generated file. Do not edit manually.
// Service generated for /Management/DatabaseInstance.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getDatabaseinstances = () =>
  getAll(ENDPOINTS.MANAGEMENT_DATABASEINSTANCE)

export const getDatabaseinstanceById = (id: number) =>
  getById(ENDPOINTS.MANAGEMENT_DATABASEINSTANCE, id)
