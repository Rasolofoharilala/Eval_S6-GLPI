// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ComputerType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getComputertypes = () =>
  getAll(ENDPOINTS.DROPDOWNS_COMPUTERTYPE)

export const getComputertypeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_COMPUTERTYPE, id)
