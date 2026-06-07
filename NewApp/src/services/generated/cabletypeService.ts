// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CableType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { CableType } from '@/types/generated'

export type { CableType } from '@/types/generated'

export const getCabletypes = () => getAll<CableType>(ENDPOINTS.DROPDOWNS_CABLETYPE)

export const getCabletypeById = (id: number) =>
  getById<CableType>(ENDPOINTS.DROPDOWNS_CABLETYPE, id)
