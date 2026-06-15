// Auto-generated file. Do not edit manually.
// Service generated for /Management/Contract.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { Contract } from '@/types/generated'

export type { Contract } from '@/types/generated'

export const getContracts = () => getAll<Contract>(ENDPOINTS.MANAGEMENT_CONTRACT)

export const getContractById = (id: number) => getById<Contract>(ENDPOINTS.MANAGEMENT_CONTRACT, id)
