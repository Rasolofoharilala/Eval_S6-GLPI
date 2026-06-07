// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/BudgetType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getBudgettypes = () => getAll(ENDPOINTS.DROPDOWNS_BUDGETTYPE)

export const getBudgettypeById = (id: number) => getById(ENDPOINTS.DROPDOWNS_BUDGETTYPE, id)
