// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/Filesystem.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { Filesystem } from '@/types/generated'

export type { Filesystem } from '@/types/generated'

export const getFilesystems = () => getAll<Filesystem>(ENDPOINTS.DROPDOWNS_FILESYSTEM)

export const getFilesystemById = (id: number) =>
  getById<Filesystem>(ENDPOINTS.DROPDOWNS_FILESYSTEM, id)
