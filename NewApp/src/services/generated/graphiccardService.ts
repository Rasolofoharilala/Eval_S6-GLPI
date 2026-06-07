// Auto-generated file. Do not edit manually.
// Service generated for /Components/GraphicCard.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { GraphicCard } from '@/types/generated'

export type { GraphicCard } from '@/types/generated'

export const getGraphiccards = () => getAll<GraphicCard>(ENDPOINTS.COMPONENTS_GRAPHICCARD)

export const getGraphiccardById = (id: number) =>
  getById<GraphicCard>(ENDPOINTS.COMPONENTS_GRAPHICCARD, id)
