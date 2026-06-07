// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/LineType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { LineType } from '@/types/generated'

export type { LineType } from '@/types/generated'

export const getLinetypes = () => getAll<LineType>(ENDPOINTS.DROPDOWNS_LINETYPE)

export const getLinetypeById = (id: number) => getById<LineType>(ENDPOINTS.DROPDOWNS_LINETYPE, id)
