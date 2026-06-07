// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CertificateType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getCertificatetypes = () => getAll(ENDPOINTS.DROPDOWNS_CERTIFICATETYPE)

export const getCertificatetypeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_CERTIFICATETYPE, id)
