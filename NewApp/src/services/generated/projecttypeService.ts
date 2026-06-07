// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ProjectType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { ProjectType } from '@/types/generated'

export type { ProjectType } from '@/types/generated'

export const getProjecttypes = () => getAll<ProjectType>(ENDPOINTS.DROPDOWNS_PROJECTTYPE)

export const getProjecttypeById = (id: number) =>
  getById<ProjectType>(ENDPOINTS.DROPDOWNS_PROJECTTYPE, id)
