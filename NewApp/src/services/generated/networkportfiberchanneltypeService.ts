// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/NetworkPortFiberchannelType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getNetworkportfiberchanneltypes = () =>
  getAll(ENDPOINTS.DROPDOWNS_NETWORKPORTFIBERCHANNELTYPE)

export const getNetworkportfiberchanneltypeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_NETWORKPORTFIBERCHANNELTYPE, id)
