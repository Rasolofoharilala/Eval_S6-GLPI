// Auto-generated file. Do not edit manually.
// Service generated for /Components/Systemboard.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getSystemboards = () =>
  getAll(ENDPOINTS.COMPONENTS_SYSTEMBOARD)

export const getSystemboardById = (id: number) =>
  getById(ENDPOINTS.COMPONENTS_SYSTEMBOARD, id)
