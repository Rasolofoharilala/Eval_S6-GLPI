// Auto-generated file. Do not edit manually.
// Service generated for /Management/Database.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Database } from '@/types/generated'

export type { Database } from '@/types/generated'

export const getDatabases = () => getAll<Database>(ENDPOINTS.MANAGEMENT_DATABASE)

export const getDatabaseById = (id: number) => getById<Database>(ENDPOINTS.MANAGEMENT_DATABASE, id)
