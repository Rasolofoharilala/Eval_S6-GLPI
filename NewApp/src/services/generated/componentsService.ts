// Auto-generated file. Do not edit manually.
// Service generated for /Components.

import { getAll } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'

export const getComponentslist = () => getAll<unknown>(ENDPOINTS.COMPONENTS)
