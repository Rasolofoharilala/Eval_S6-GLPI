// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DocumentCategory.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { DocumentCategory } from '@/types/generated'

export type { DocumentCategory } from '@/types/generated'

export const getDocumentcategories = () =>
  getAll<DocumentCategory>(ENDPOINTS.DROPDOWNS_DOCUMENTCATEGORY)

export const getDocumentcategoryById = (id: number) =>
  getById<DocumentCategory>(ENDPOINTS.DROPDOWNS_DOCUMENTCATEGORY, id)
