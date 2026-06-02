// Auto-generated file. Do not edit manually.
// Service generated for /Components.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getComponentslist = () =>
  getAll(ENDPOINTS.COMPONENTS)
