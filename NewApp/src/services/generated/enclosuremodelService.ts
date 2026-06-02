// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/EnclosureModel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getEnclosuremodels = () =>
  getAll(ENDPOINTS.DROPDOWNS_ENCLOSUREMODEL)

export const getEnclosuremodelById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_ENCLOSUREMODEL, id)
