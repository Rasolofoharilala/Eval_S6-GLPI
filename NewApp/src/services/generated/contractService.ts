// Auto-generated file. Do not edit manually.
// Service generated for /Management/Contract.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getContracts = () => getAll(ENDPOINTS.MANAGEMENT_CONTRACT)

export const getContractById = (id: number) => getById(ENDPOINTS.MANAGEMENT_CONTRACT, id)
