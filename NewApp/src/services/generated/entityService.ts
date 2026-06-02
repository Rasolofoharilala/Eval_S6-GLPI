// Auto-generated file. Do not edit manually.
// Service generated for /Administration/Entity.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getEntities = () =>
  getAll(ENDPOINTS.ADMINISTRATION_ENTITY)

export const getEntityById = (id: number) =>
  getById(ENDPOINTS.ADMINISTRATION_ENTITY, id)
