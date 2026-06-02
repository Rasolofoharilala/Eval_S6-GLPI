// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Unmanaged.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getUnmanageds = () =>
  getAll(ENDPOINTS.ASSETS_UNMANAGED)

export const getUnmanagedById = (id: number) =>
  getById(ENDPOINTS.ASSETS_UNMANAGED, id)
