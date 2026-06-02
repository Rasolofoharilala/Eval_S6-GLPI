// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ContractType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getContracttypes = () =>
  getAll(ENDPOINTS.DROPDOWNS_CONTRACTTYPE)

export const getContracttypeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_CONTRACTTYPE, id)
