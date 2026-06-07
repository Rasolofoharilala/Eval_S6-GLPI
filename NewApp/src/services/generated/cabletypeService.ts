// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CableType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getCabletypes = () => getAll(ENDPOINTS.DROPDOWNS_CABLETYPE)

export const getCabletypeById = (id: number) => getById(ENDPOINTS.DROPDOWNS_CABLETYPE, id)
