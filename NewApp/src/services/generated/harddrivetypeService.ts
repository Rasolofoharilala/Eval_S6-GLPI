// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/HardDriveType.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { HardDriveType } from '@/types/generated'

export type { HardDriveType } from '@/types/generated'

export const getHarddrivetypes = () => getAll<HardDriveType>(ENDPOINTS.DROPDOWNS_HARDDRIVETYPE)

export const getHarddrivetypeById = (id: number) =>
  getById<HardDriveType>(ENDPOINTS.DROPDOWNS_HARDDRIVETYPE, id)
