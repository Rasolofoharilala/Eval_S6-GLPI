// Auto-generated file. Do not edit manually.
// Service generated for /Management/Database.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getDatabases = () =>
  getAll(ENDPOINTS.MANAGEMENT_DATABASE)

export const getDatabaseById = (id: number) =>
  getById(ENDPOINTS.MANAGEMENT_DATABASE, id)
