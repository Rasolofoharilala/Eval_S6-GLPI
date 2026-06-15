// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/BudgetType.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { BudgetType } from '@/types/generated'

export type { BudgetType } from '@/types/generated'

export const getBudgettypes = () => getAll<BudgetType>(ENDPOINTS.DROPDOWNS_BUDGETTYPE)

export const getBudgettypeById = (id: number) =>
  getById<BudgetType>(ENDPOINTS.DROPDOWNS_BUDGETTYPE, id)
