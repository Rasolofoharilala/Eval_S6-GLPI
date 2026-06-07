// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/SolutionType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getSolutiontypes = () => getAll(ENDPOINTS.DROPDOWNS_SOLUTIONTYPE)

export const getSolutiontypeById = (id: number) => getById(ENDPOINTS.DROPDOWNS_SOLUTIONTYPE, id)
