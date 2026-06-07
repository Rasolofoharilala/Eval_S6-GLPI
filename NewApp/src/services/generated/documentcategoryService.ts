// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DocumentCategory.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getDocumentcategories = () => getAll(ENDPOINTS.DROPDOWNS_DOCUMENTCATEGORY)

export const getDocumentcategoryById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_DOCUMENTCATEGORY, id)
