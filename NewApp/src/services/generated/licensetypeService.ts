// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/LicenseType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getLicensetypes = () =>
  getAll(ENDPOINTS.DROPDOWNS_LICENSETYPE)

export const getLicensetypeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_LICENSETYPE, id)
