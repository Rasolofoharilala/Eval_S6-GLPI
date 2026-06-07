// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Software.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Software } from '@/types/generated'

export type { Software } from '@/types/generated'

export const getSoftwares = () => getAll<Software>(ENDPOINTS.ASSETS_SOFTWARE)

export const getSoftwareById = (id: number) => getById<Software>(ENDPOINTS.ASSETS_SOFTWARE, id)
