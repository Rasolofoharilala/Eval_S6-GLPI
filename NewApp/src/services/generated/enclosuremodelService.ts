// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/EnclosureModel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { EnclosureModel } from '@/types/generated'

export type { EnclosureModel } from '@/types/generated'

export const getEnclosuremodels = () => getAll<EnclosureModel>(ENDPOINTS.DROPDOWNS_ENCLOSUREMODEL)

export const getEnclosuremodelById = (id: number) =>
  getById<EnclosureModel>(ENDPOINTS.DROPDOWNS_ENCLOSUREMODEL, id)
