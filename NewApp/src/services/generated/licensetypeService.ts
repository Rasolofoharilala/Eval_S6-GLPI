// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/LicenseType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { LicenseType } from '@/types/generated'

export type { LicenseType } from '@/types/generated'

export const getLicensetypes = () => getAll<LicenseType>(ENDPOINTS.DROPDOWNS_LICENSETYPE)

export const getLicensetypeById = (id: number) =>
  getById<LicenseType>(ENDPOINTS.DROPDOWNS_LICENSETYPE, id)
