// Auto-generated file. Do not edit manually.
// Service generated for /Setup/FieldUnicity.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getFieldunicities = () => getAll(ENDPOINTS.SETUP_FIELDUNICITY)

export const getFieldunicityById = (id: number) => getById(ENDPOINTS.SETUP_FIELDUNICITY, id)
