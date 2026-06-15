// Auto-generated file. Do not edit manually.
// Service generated for /Components/HardDrive.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { HardDrive } from '@/types/generated'

export type { HardDrive } from '@/types/generated'

export const getHarddrives = () => getAll<HardDrive>(ENDPOINTS.COMPONENTS_HARDDRIVE)

export const getHarddriveById = (id: number) =>
  getById<HardDrive>(ENDPOINTS.COMPONENTS_HARDDRIVE, id)
