// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ComputerModel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getComputermodels = () => getAll(ENDPOINTS.DROPDOWNS_COMPUTERMODEL)

export const getComputermodelById = (id: number) => getById(ENDPOINTS.DROPDOWNS_COMPUTERMODEL, id)
