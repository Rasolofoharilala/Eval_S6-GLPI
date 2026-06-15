// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ComputerModel.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { ComputerModel } from '@/types/generated'

export type { ComputerModel } from '@/types/generated'

export const getComputermodels = () => getAll<ComputerModel>(ENDPOINTS.DROPDOWNS_COMPUTERMODEL)

export const getComputermodelById = (id: number) =>
  getById<ComputerModel>(ENDPOINTS.DROPDOWNS_COMPUTERMODEL, id)
