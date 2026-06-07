// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ValidationTemplate.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { ValidationTemplate } from '@/types/generated'

export type { ValidationTemplate } from '@/types/generated'

export const getValidationtemplates = () =>
  getAll<ValidationTemplate>(ENDPOINTS.DROPDOWNS_VALIDATIONTEMPLATE)

export const getValidationtemplateById = (id: number) =>
  getById<ValidationTemplate>(ENDPOINTS.DROPDOWNS_VALIDATIONTEMPLATE, id)
