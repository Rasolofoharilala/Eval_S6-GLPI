// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/TaskTemplate.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { TaskTemplate } from '@/types/generated'

export type { TaskTemplate } from '@/types/generated'

export const getTasktemplates = () => getAll<TaskTemplate>(ENDPOINTS.DROPDOWNS_TASKTEMPLATE)

export const getTasktemplateById = (id: number) =>
  getById<TaskTemplate>(ENDPOINTS.DROPDOWNS_TASKTEMPLATE, id)
