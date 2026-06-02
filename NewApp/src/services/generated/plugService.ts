// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/Plug.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPlugs = () =>
  getAll(ENDPOINTS.DROPDOWNS_PLUG)

export const getPlugById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_PLUG, id)
