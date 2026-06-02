// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ValidationTemplate.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getValidationtemplates = () =>
  getAll(ENDPOINTS.DROPDOWNS_VALIDATIONTEMPLATE)

export const getValidationtemplateById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_VALIDATIONTEMPLATE, id)
