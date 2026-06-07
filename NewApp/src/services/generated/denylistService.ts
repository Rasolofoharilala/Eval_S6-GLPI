// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DenyList.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { DenyList } from '@/types/generated'

export type { DenyList } from '@/types/generated'

export const getDenylists = () => getAll<DenyList>(ENDPOINTS.DROPDOWNS_DENYLIST)

export const getDenylistById = (id: number) => getById<DenyList>(ENDPOINTS.DROPDOWNS_DENYLIST, id)
