// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Change.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Change } from '@/types/generated'

export type { Change } from '@/types/generated'

export const getChanges = () => getAll<Change>(ENDPOINTS.ASSISTANCE_CHANGE)

export const getChangeById = (id: number) => getById<Change>(ENDPOINTS.ASSISTANCE_CHANGE, id)
