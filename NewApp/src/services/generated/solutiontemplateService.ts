// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/SolutionTemplate.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getSolutiontemplates = () => getAll(ENDPOINTS.DROPDOWNS_SOLUTIONTEMPLATE)

export const getSolutiontemplateById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_SOLUTIONTEMPLATE, id)
