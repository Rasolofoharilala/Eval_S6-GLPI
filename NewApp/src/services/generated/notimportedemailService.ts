// Auto-generated file. Do not edit manually.
// Service generated for /Setup/NotImportedEmail.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { NotImportedEmail } from '@/types/generated'

export type { NotImportedEmail } from '@/types/generated'

export const getNotimportedemails = () => getAll<NotImportedEmail>(ENDPOINTS.SETUP_NOTIMPORTEDEMAIL)

export const getNotimportedemailById = (id: number) =>
  getById<NotImportedEmail>(ENDPOINTS.SETUP_NOTIMPORTEDEMAIL, id)
