// Auto-generated file. Do not edit manually.
// Service generated for /Management/License.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { License } from '@/types/generated'

export type { License } from '@/types/generated'

export const getLicenses = () => getAll<License>(ENDPOINTS.MANAGEMENT_LICENSE)

export const getLicenseById = (id: number) => getById<License>(ENDPOINTS.MANAGEMENT_LICENSE, id)
