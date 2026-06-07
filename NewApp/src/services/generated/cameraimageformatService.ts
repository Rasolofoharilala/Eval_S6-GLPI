// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CameraImageFormat.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getCameraimageformats = () => getAll(ENDPOINTS.DROPDOWNS_CAMERAIMAGEFORMAT)

export const getCameraimageformatById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_CAMERAIMAGEFORMAT, id)
