// Auto-generated file. Do not edit manually.
// Service generated for /Project/Task.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { ProjectTask } from '@/types/generated'

export type { ProjectTask } from '@/types/generated'

export const getTasks = () => getAll<ProjectTask>(ENDPOINTS.PROJECT_TASK)

export const getTaskById = (id: number) => getById<ProjectTask>(ENDPOINTS.PROJECT_TASK, id)
