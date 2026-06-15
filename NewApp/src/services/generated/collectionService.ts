// Auto-generated file. Do not edit manually.
// Service generated for /Rule/Collection.

import { getAll } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'

export const getCollections = () => getAll<unknown>(ENDPOINTS.RULE_COLLECTION)
