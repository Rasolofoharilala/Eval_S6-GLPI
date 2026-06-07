// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DocumentType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getDocumenttypes = () => getAll(ENDPOINTS.DROPDOWNS_DOCUMENTTYPE)

export const getDocumenttypeById = (id: number) => getById(ENDPOINTS.DROPDOWNS_DOCUMENTTYPE, id)
