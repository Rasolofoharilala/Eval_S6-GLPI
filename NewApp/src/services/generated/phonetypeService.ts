// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/PhoneType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPhonetypes = () => getAll(ENDPOINTS.DROPDOWNS_PHONETYPE)

export const getPhonetypeById = (id: number) => getById(ENDPOINTS.DROPDOWNS_PHONETYPE, id)
