// Auto-generated file. Do not edit manually.
// Service generated for /Administration/Group.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Group } from '@/types/generated'

export type { Group } from '@/types/generated'

export const getGroups = () => getAll<Group>(ENDPOINTS.ADMINISTRATION_GROUP)

export const getGroupById = (id: number) => getById<Group>(ENDPOINTS.ADMINISTRATION_GROUP, id)
