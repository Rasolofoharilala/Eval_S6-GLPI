// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Certificate.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Certificate } from '@/types/generated'

export type { Certificate } from '@/types/generated'

export const getCertificates = () => getAll<Certificate>(ENDPOINTS.ASSETS_CERTIFICATE)

export const getCertificateById = (id: number) =>
  getById<Certificate>(ENDPOINTS.ASSETS_CERTIFICATE, id)
