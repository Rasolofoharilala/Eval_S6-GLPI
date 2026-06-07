// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/VirtualMachineModel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { VirtualMachineModel } from '@/types/generated'

export type { VirtualMachineModel } from '@/types/generated'

export const getVirtualmachinemodels = () =>
  getAll<VirtualMachineModel>(ENDPOINTS.DROPDOWNS_VIRTUALMACHINEMODEL)

export const getVirtualmachinemodelById = (id: number) =>
  getById<VirtualMachineModel>(ENDPOINTS.DROPDOWNS_VIRTUALMACHINEMODEL, id)
