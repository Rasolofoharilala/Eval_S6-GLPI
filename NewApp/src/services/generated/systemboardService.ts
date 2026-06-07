// Auto-generated file. Do not edit manually.
// Service generated for /Components/Systemboard.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Systemboard } from '@/types/generated'

export type { Systemboard } from '@/types/generated'

export const getSystemboards = () => getAll<Systemboard>(ENDPOINTS.COMPONENTS_SYSTEMBOARD)

export const getSystemboardById = (id: number) =>
  getById<Systemboard>(ENDPOINTS.COMPONENTS_SYSTEMBOARD, id)
