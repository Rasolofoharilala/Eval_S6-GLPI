// Auto-generated file. Do not edit manually.
// Service generated for /Assets/SoftwareLicense.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getSoftwarelicenses = () =>
  getAll(ENDPOINTS.ASSETS_SOFTWARELICENSE)

export const getSoftwarelicenseById = (id: number) =>
  getById(ENDPOINTS.ASSETS_SOFTWARELICENSE, id)
