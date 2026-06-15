// Auto-generated file. Do not edit manually.
// Service generated for /Session/EntityTree.

import { getAll } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'

export const getEntitytrees = () => getAll<unknown>(ENDPOINTS.SESSION_ENTITYTREE)
