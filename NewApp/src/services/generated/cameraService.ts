// Auto-generated file. Do not edit manually.
// Service generated for /Components/Camera.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getCameras = () => getAll(ENDPOINTS.COMPONENTS_CAMERA)

export const getCameraById = (id: number) => getById(ENDPOINTS.COMPONENTS_CAMERA, id)
