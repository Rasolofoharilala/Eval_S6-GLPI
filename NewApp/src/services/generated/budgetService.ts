// Auto-generated file. Do not edit manually.
// Service generated for /Management/Budget.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { Budget } from '@/types/generated'

export type { Budget } from '@/types/generated'

export const getBudgets = () => getAll<Budget>(ENDPOINTS.MANAGEMENT_BUDGET)

export const getBudgetById = (id: number) => getById<Budget>(ENDPOINTS.MANAGEMENT_BUDGET, id)
