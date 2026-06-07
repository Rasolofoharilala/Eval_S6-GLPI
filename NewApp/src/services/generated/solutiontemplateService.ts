// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/SolutionTemplate.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { SolutionTemplate } from '@/types/generated'

export type { SolutionTemplate } from '@/types/generated'

export const getSolutiontemplates = () =>
  getAll<SolutionTemplate>(ENDPOINTS.DROPDOWNS_SOLUTIONTEMPLATE)

export const getSolutiontemplateById = (id: number) =>
  getById<SolutionTemplate>(ENDPOINTS.DROPDOWNS_SOLUTIONTEMPLATE, id)
