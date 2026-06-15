// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CameraImageFormat.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { CameraImageFormat } from '@/types/generated'

export type { CameraImageFormat } from '@/types/generated'

export const getCameraimageformats = () =>
  getAll<CameraImageFormat>(ENDPOINTS.DROPDOWNS_CAMERAIMAGEFORMAT)

export const getCameraimageformatById = (id: number) =>
  getById<CameraImageFormat>(ENDPOINTS.DROPDOWNS_CAMERAIMAGEFORMAT, id)
