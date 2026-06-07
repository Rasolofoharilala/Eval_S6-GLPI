// Auto-generated file. Do not edit manually.
// Service generated for /Components/Controller.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Controller } from '@/types/generated'

export type { Controller } from '@/types/generated'

export const getControllers = () => getAll<Controller>(ENDPOINTS.COMPONENTS_CONTROLLER)

export const getControllerById = (id: number) =>
  getById<Controller>(ENDPOINTS.COMPONENTS_CONTROLLER, id)
