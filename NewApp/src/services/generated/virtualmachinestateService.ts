// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/VirtualMachineState.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getVirtualmachinestates = () =>
  getAll(ENDPOINTS.DROPDOWNS_VIRTUALMACHINESTATE)

export const getVirtualmachinestateById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_VIRTUALMACHINESTATE, id)
