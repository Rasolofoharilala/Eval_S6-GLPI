// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ProjectTaskType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getProjecttasktypes = () => getAll(ENDPOINTS.DROPDOWNS_PROJECTTASKTYPE)

export const getProjecttasktypeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_PROJECTTASKTYPE, id)
