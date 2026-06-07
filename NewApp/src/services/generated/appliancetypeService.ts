// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ApplianceType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getAppliancetypes = () => getAll(ENDPOINTS.DROPDOWNS_APPLIANCETYPE)

export const getAppliancetypeById = (id: number) => getById(ENDPOINTS.DROPDOWNS_APPLIANCETYPE, id)
