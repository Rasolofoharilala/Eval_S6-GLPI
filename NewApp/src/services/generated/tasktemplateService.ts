// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/TaskTemplate.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getTasktemplates = () =>
  getAll(ENDPOINTS.DROPDOWNS_TASKTEMPLATE)

export const getTasktemplateById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_TASKTEMPLATE, id)
