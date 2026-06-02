// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/Filesystem.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getFilesystems = () =>
  getAll(ENDPOINTS.DROPDOWNS_FILESYSTEM)

export const getFilesystemById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_FILESYSTEM, id)
