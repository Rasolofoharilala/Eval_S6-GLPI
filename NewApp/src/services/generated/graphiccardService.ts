// Auto-generated file. Do not edit manually.
// Service generated for /Components/GraphicCard.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getGraphiccards = () =>
  getAll(ENDPOINTS.COMPONENTS_GRAPHICCARD)

export const getGraphiccardById = (id: number) =>
  getById(ENDPOINTS.COMPONENTS_GRAPHICCARD, id)
