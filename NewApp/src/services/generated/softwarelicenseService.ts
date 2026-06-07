// Auto-generated file. Do not edit manually.
// Service generated for /Assets/SoftwareLicense.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { SoftwareLicense } from '@/types/generated'

export type { SoftwareLicense } from '@/types/generated'

export const getSoftwarelicenses = () => getAll<SoftwareLicense>(ENDPOINTS.ASSETS_SOFTWARELICENSE)

export const getSoftwarelicenseById = (id: number) =>
  getById<SoftwareLicense>(ENDPOINTS.ASSETS_SOFTWARELICENSE, id)
