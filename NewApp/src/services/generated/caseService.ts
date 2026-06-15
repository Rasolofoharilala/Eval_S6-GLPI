// Auto-generated file. Do not edit manually.
// Service generated for /Components/Case.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { Case } from '@/types/generated'

export type { Case } from '@/types/generated'

export const getCases = () => getAll<Case>(ENDPOINTS.COMPONENTS_CASE)

export const getCaseById = (id: number) => getById<Case>(ENDPOINTS.COMPONENTS_CASE, id)
