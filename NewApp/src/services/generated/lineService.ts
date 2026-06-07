// Auto-generated file. Do not edit manually.
// Service generated for /Management/Line.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Line } from '@/types/generated'

export type { Line } from '@/types/generated'

export const getLines = () => getAll<Line>(ENDPOINTS.MANAGEMENT_LINE)

export const getLineById = (id: number) => getById<Line>(ENDPOINTS.MANAGEMENT_LINE, id)
