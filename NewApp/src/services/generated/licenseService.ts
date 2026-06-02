// Auto-generated file. Do not edit manually.
// Service generated for /Management/License.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getLicenses = () =>
  getAll(ENDPOINTS.MANAGEMENT_LICENSE)

export const getLicenseById = (id: number) =>
  getById(ENDPOINTS.MANAGEMENT_LICENSE, id)
