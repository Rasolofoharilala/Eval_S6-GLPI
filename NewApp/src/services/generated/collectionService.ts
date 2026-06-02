// Auto-generated file. Do not edit manually.
// Service generated for /Rule/Collection.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getCollections = () =>
  getAll(ENDPOINTS.RULE_COLLECTION)
