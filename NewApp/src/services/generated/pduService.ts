// Auto-generated file. Do not edit manually.
// Service generated for /Assets/PDU.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { PDU } from '@/types/generated'

export type { PDU } from '@/types/generated'

export const getPdus = () => getAll<PDU>(ENDPOINTS.ASSETS_PDU)

export const getPduById = (id: number) => getById<PDU>(ENDPOINTS.ASSETS_PDU, id)
