// Auto-generated file. Do not edit manually.
// Service generated for /Project/Task.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getTasks = () =>
  getAll(ENDPOINTS.PROJECT_TASK)

export const getTaskById = (id: number) =>
  getById(ENDPOINTS.PROJECT_TASK, id)
