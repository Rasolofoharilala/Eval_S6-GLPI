// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CertificateType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { CertificateType } from '@/types/generated'

export type { CertificateType } from '@/types/generated'

export const getCertificatetypes = () =>
  getAll<CertificateType>(ENDPOINTS.DROPDOWNS_CERTIFICATETYPE)

export const getCertificatetypeById = (id: number) =>
  getById<CertificateType>(ENDPOINTS.DROPDOWNS_CERTIFICATETYPE, id)
