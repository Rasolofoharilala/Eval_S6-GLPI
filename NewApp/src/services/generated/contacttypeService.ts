// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ContactType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getContacttypes = () => getAll(ENDPOINTS.DROPDOWNS_CONTACTTYPE)

export const getContacttypeById = (id: number) => getById(ENDPOINTS.DROPDOWNS_CONTACTTYPE, id)
