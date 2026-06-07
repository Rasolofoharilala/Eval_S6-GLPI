// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DomainType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getDomaintypes = () => getAll(ENDPOINTS.DROPDOWNS_DOMAINTYPE)

export const getDomaintypeById = (id: number) => getById(ENDPOINTS.DROPDOWNS_DOMAINTYPE, id)
