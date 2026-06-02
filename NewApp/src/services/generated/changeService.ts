// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Change.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getChanges = () =>
  getAll(ENDPOINTS.ASSISTANCE_CHANGE)

export const getChangeById = (id: number) =>
  getById(ENDPOINTS.ASSISTANCE_CHANGE, id)
