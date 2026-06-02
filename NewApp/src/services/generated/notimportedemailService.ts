// Auto-generated file. Do not edit manually.
// Service generated for /Setup/NotImportedEmail.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getNotimportedemails = () =>
  getAll(ENDPOINTS.SETUP_NOTIMPORTEDEMAIL)

export const getNotimportedemailById = (id: number) =>
  getById(ENDPOINTS.SETUP_NOTIMPORTEDEMAIL, id)
