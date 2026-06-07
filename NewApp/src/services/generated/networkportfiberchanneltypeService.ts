// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/NetworkPortFiberchannelType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { NetworkPortFiberchannelType } from '@/types/generated'

export type { NetworkPortFiberchannelType } from '@/types/generated'

export const getNetworkportfiberchanneltypes = () =>
  getAll<NetworkPortFiberchannelType>(ENDPOINTS.DROPDOWNS_NETWORKPORTFIBERCHANNELTYPE)

export const getNetworkportfiberchanneltypeById = (id: number) =>
  getById<NetworkPortFiberchannelType>(ENDPOINTS.DROPDOWNS_NETWORKPORTFIBERCHANNELTYPE, id)
