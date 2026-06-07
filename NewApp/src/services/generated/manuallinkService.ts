// Auto-generated file. Do not edit manually.
// Service generated for /Setup/ManualLink.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getManuallinks = () => getAll(ENDPOINTS.SETUP_MANUALLINK)

export const getManuallinkById = (id: number) => getById(ENDPOINTS.SETUP_MANUALLINK, id)
