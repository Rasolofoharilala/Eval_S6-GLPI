// Auto-generated file. Do not edit manually.
// Service generated for /Administration/Entity.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Entity } from '@/types/generated'

export type { Entity } from '@/types/generated'

export const getEntities = () => getAll<Entity>(ENDPOINTS.ADMINISTRATION_ENTITY)

export const getEntityById = (id: number) => getById<Entity>(ENDPOINTS.ADMINISTRATION_ENTITY, id)
