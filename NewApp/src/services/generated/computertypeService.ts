// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ComputerType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { ComputerType } from '@/types/generated'

export type { ComputerType } from '@/types/generated'

export const getComputertypes = () => getAll<ComputerType>(ENDPOINTS.DROPDOWNS_COMPUTERTYPE)

export const getComputertypeById = (id: number) =>
  getById<ComputerType>(ENDPOINTS.DROPDOWNS_COMPUTERTYPE, id)
