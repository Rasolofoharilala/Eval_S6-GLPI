// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/VirtualMachineType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getVirtualmachinetypes = () => getAll(ENDPOINTS.DROPDOWNS_VIRTUALMACHINETYPE)

export const getVirtualmachinetypeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_VIRTUALMACHINETYPE, id)
