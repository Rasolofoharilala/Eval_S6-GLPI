// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/NetworkPortType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getNetworkporttypes = () =>
  getAll(ENDPOINTS.DROPDOWNS_NETWORKPORTTYPE)

export const getNetworkporttypeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_NETWORKPORTTYPE, id)
