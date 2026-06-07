// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/VirtualMachineState.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { VirtualMachineState } from '@/types/generated'

export type { VirtualMachineState } from '@/types/generated'

export const getVirtualmachinestates = () =>
  getAll<VirtualMachineState>(ENDPOINTS.DROPDOWNS_VIRTUALMACHINESTATE)

export const getVirtualmachinestateById = (id: number) =>
  getById<VirtualMachineState>(ENDPOINTS.DROPDOWNS_VIRTUALMACHINESTATE, id)
