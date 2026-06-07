// Auto-generated file. Do not edit manually.
// Service generated for /Session/EntityTree.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getEntitytrees = () => getAll<unknown>(ENDPOINTS.SESSION_ENTITYTREE)
