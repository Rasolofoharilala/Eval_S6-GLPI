// Auto-generated file. Do not edit manually.
// Service generated for /Assets/PDU.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPdus = () => getAll(ENDPOINTS.ASSETS_PDU)

export const getPduById = (id: number) => getById(ENDPOINTS.ASSETS_PDU, id)
