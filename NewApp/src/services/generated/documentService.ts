// Auto-generated file. Do not edit manually.
// Service generated for /Management/Document.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Document } from '@/types/generated'

export type { Document } from '@/types/generated'

export const getDocuments = () => getAll<Document>(ENDPOINTS.MANAGEMENT_DOCUMENT)

export const getDocumentById = (id: number) => getById<Document>(ENDPOINTS.MANAGEMENT_DOCUMENT, id)
