// Auto-generated file. Do not edit manually.
// Service generated for /Management/Budget.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getBudgets = () =>
  getAll(ENDPOINTS.MANAGEMENT_BUDGET)

export const getBudgetById = (id: number) =>
  getById(ENDPOINTS.MANAGEMENT_BUDGET, id)
