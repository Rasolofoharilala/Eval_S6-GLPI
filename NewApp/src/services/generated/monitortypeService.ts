// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/MonitorType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getMonitortypes = () => getAll(ENDPOINTS.DROPDOWNS_MONITORTYPE)

export const getMonitortypeById = (id: number) => getById(ENDPOINTS.DROPDOWNS_MONITORTYPE, id)
