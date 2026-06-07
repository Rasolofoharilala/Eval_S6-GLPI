// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/AutoUpdateSystem.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getAutoupdatesystems = () => getAll(ENDPOINTS.DROPDOWNS_AUTOUPDATESYSTEM)

export const getAutoupdatesystemById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_AUTOUPDATESYSTEM, id)
