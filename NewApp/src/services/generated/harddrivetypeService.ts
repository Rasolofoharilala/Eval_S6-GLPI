// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/HardDriveType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { HardDriveType } from '@/types/generated'

export type { HardDriveType } from '@/types/generated'

export const getHarddrivetypes = () => getAll<HardDriveType>(ENDPOINTS.DROPDOWNS_HARDDRIVETYPE)

export const getHarddrivetypeById = (id: number) =>
  getById<HardDriveType>(ENDPOINTS.DROPDOWNS_HARDDRIVETYPE, id)
