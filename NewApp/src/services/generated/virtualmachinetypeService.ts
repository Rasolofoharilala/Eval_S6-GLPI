// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/VirtualMachineType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { VirtualMachineType } from '@/types/generated'

export type { VirtualMachineType } from '@/types/generated'

export const getVirtualmachinetypes = () =>
  getAll<VirtualMachineType>(ENDPOINTS.DROPDOWNS_VIRTUALMACHINETYPE)

export const getVirtualmachinetypeById = (id: number) =>
  getById<VirtualMachineType>(ENDPOINTS.DROPDOWNS_VIRTUALMACHINETYPE, id)
