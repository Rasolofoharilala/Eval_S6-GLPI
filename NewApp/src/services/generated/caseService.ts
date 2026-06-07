// Auto-generated file. Do not edit manually.
// Service generated for /Components/Case.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getCases = () => getAll(ENDPOINTS.COMPONENTS_CASE)

export const getCaseById = (id: number) => getById(ENDPOINTS.COMPONENTS_CASE, id)
