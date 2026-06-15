// Auto-generated file. Do not edit manually.
// Service generated for /Components/Drive.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { Drive } from '@/types/generated'

export type { Drive } from '@/types/generated'

export const getDrives = () => getAll<Drive>(ENDPOINTS.COMPONENTS_DRIVE)

export const getDriveById = (id: number) => getById<Drive>(ENDPOINTS.COMPONENTS_DRIVE, id)
