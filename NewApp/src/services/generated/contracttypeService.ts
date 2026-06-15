// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ContractType.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { ContractType } from '@/types/generated'

export type { ContractType } from '@/types/generated'

export const getContracttypes = () => getAll<ContractType>(ENDPOINTS.DROPDOWNS_CONTRACTTYPE)

export const getContracttypeById = (id: number) =>
  getById<ContractType>(ENDPOINTS.DROPDOWNS_CONTRACTTYPE, id)
