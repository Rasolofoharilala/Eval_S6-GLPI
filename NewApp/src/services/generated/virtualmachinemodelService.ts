// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/VirtualMachineModel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getVirtualmachinemodels = () => getAll(ENDPOINTS.DROPDOWNS_VIRTUALMACHINEMODEL)

export const getVirtualmachinemodelById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_VIRTUALMACHINEMODEL, id)
