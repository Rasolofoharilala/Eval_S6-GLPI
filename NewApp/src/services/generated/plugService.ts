// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/Plug.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Plug } from '@/types/generated'

export type { Plug } from '@/types/generated'

export const getPlugs = () => getAll<Plug>(ENDPOINTS.DROPDOWNS_PLUG)

export const getPlugById = (id: number) => getById<Plug>(ENDPOINTS.DROPDOWNS_PLUG, id)
