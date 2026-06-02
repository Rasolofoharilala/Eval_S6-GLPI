// Auto-generated file. Do not edit manually.
// Service generated for /Components/Drive.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getDrives = () =>
  getAll(ENDPOINTS.COMPONENTS_DRIVE)

export const getDriveById = (id: number) =>
  getById(ENDPOINTS.COMPONENTS_DRIVE, id)
