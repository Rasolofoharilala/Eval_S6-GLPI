// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ProjectTaskType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { ProjectTaskType } from '@/types/generated'

export type { ProjectTaskType } from '@/types/generated'

export const getProjecttasktypes = () =>
  getAll<ProjectTaskType>(ENDPOINTS.DROPDOWNS_PROJECTTASKTYPE)

export const getProjecttasktypeById = (id: number) =>
  getById<ProjectTaskType>(ENDPOINTS.DROPDOWNS_PROJECTTASKTYPE, id)
