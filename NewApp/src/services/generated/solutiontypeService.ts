// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/SolutionType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { SolutionType } from '@/types/generated'

export type { SolutionType } from '@/types/generated'

export const getSolutiontypes = () => getAll<SolutionType>(ENDPOINTS.DROPDOWNS_SOLUTIONTYPE)

export const getSolutiontypeById = (id: number) =>
  getById<SolutionType>(ENDPOINTS.DROPDOWNS_SOLUTIONTYPE, id)
