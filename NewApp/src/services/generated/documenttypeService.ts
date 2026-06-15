// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DocumentType.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { DocumentType } from '@/types/generated'

export type { DocumentType } from '@/types/generated'

export const getDocumenttypes = () => getAll<DocumentType>(ENDPOINTS.DROPDOWNS_DOCUMENTTYPE)

export const getDocumenttypeById = (id: number) =>
  getById<DocumentType>(ENDPOINTS.DROPDOWNS_DOCUMENTTYPE, id)
