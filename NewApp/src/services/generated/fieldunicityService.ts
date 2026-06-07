// Auto-generated file. Do not edit manually.
// Service generated for /Setup/FieldUnicity.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { FieldUnicity } from '@/types/generated'

export type { FieldUnicity } from '@/types/generated'

export const getFieldunicities = () => getAll<FieldUnicity>(ENDPOINTS.SETUP_FIELDUNICITY)

export const getFieldunicityById = (id: number) =>
  getById<FieldUnicity>(ENDPOINTS.SETUP_FIELDUNICITY, id)
