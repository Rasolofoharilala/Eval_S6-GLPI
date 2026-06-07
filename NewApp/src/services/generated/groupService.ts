// Auto-generated file. Do not edit manually.
// Service generated for /Administration/Group.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getGroups = () => getAll(ENDPOINTS.ADMINISTRATION_GROUP)

export const getGroupById = (id: number) => getById(ENDPOINTS.ADMINISTRATION_GROUP, id)
