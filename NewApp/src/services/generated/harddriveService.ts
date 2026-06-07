// Auto-generated file. Do not edit manually.
// Service generated for /Components/HardDrive.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getHarddrives = () => getAll(ENDPOINTS.COMPONENTS_HARDDRIVE)

export const getHarddriveById = (id: number) => getById(ENDPOINTS.COMPONENTS_HARDDRIVE, id)
