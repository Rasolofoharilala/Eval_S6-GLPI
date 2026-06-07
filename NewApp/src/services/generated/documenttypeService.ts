// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DocumentType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { DocumentType } from '@/types/generated'

export type { DocumentType } from '@/types/generated'

export const getDocumenttypes = () => getAll<DocumentType>(ENDPOINTS.DROPDOWNS_DOCUMENTTYPE)

export const getDocumenttypeById = (id: number) =>
  getById<DocumentType>(ENDPOINTS.DROPDOWNS_DOCUMENTTYPE, id)
