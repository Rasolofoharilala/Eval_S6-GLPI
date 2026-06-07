// Auto-generated file. Do not edit manually.
// Service generated for /Components/Camera.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Camera } from '@/types/generated'

export type { Camera } from '@/types/generated'

export const getCameras = () => getAll<Camera>(ENDPOINTS.COMPONENTS_CAMERA)

export const getCameraById = (id: number) => getById<Camera>(ENDPOINTS.COMPONENTS_CAMERA, id)
