// Auto-generated file. Do not edit manually.
// Service generated for /Management/Document.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getDocuments = () =>
  getAll(ENDPOINTS.MANAGEMENT_DOCUMENT)

export const getDocumentById = (id: number) =>
  getById(ENDPOINTS.MANAGEMENT_DOCUMENT, id)
