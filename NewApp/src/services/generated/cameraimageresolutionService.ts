// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CameraImageResolution.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { CameraImageResolution } from '@/types/generated'

export type { CameraImageResolution } from '@/types/generated'

export const getCameraimageresolutions = () =>
  getAll<CameraImageResolution>(ENDPOINTS.DROPDOWNS_CAMERAIMAGERESOLUTION)

export const getCameraimageresolutionById = (id: number) =>
  getById<CameraImageResolution>(ENDPOINTS.DROPDOWNS_CAMERAIMAGERESOLUTION, id)
