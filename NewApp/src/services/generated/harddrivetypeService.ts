// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/HardDriveType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getHarddrivetypes = () => getAll(ENDPOINTS.DROPDOWNS_HARDDRIVETYPE)

export const getHarddrivetypeById = (id: number) => getById(ENDPOINTS.DROPDOWNS_HARDDRIVETYPE, id)
