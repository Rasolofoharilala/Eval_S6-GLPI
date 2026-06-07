// Auto-generated file. Do not edit manually.
// Service generated for /Management/DatabaseInstance.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { DatabaseInstance } from '@/types/generated'

export type { DatabaseInstance } from '@/types/generated'

export const getDatabaseinstances = () =>
  getAll<DatabaseInstance>(ENDPOINTS.MANAGEMENT_DATABASEINSTANCE)

export const getDatabaseinstanceById = (id: number) =>
  getById<DatabaseInstance>(ENDPOINTS.MANAGEMENT_DATABASEINSTANCE, id)
