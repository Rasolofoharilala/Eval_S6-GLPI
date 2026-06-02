// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Certificate.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getCertificates = () =>
  getAll(ENDPOINTS.ASSETS_CERTIFICATE)

export const getCertificateById = (id: number) =>
  getById(ENDPOINTS.ASSETS_CERTIFICATE, id)
