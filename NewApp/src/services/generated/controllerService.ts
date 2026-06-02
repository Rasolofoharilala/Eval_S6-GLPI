// Auto-generated file. Do not edit manually.
// Service generated for /Components/Controller.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getControllers = () =>
  getAll(ENDPOINTS.COMPONENTS_CONTROLLER)

export const getControllerById = (id: number) =>
  getById(ENDPOINTS.COMPONENTS_CONTROLLER, id)
