// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/SolutionType.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { SolutionType } from '@/types/generated'

export type { SolutionType } from '@/types/generated'

export const getSolutiontypes = () => getAll<SolutionType>(ENDPOINTS.DROPDOWNS_SOLUTIONTYPE)

export const getSolutiontypeById = (id: number) =>
  getById<SolutionType>(ENDPOINTS.DROPDOWNS_SOLUTIONTYPE, id)
