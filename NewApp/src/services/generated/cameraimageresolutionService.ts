// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CameraImageResolution.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getCameraimageresolutions = () => getAll(ENDPOINTS.DROPDOWNS_CAMERAIMAGERESOLUTION)

export const getCameraimageresolutionById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_CAMERAIMAGERESOLUTION, id)
