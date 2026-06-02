// Auto-generated file. Do not edit manually.
// Service generated for /Management/Line.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getLines = () =>
  getAll(ENDPOINTS.MANAGEMENT_LINE)

export const getLineById = (id: number) =>
  getById(ENDPOINTS.MANAGEMENT_LINE, id)
