// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/NetworkPortType.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { NetworkPortType } from '@/types/generated'

export type { NetworkPortType } from '@/types/generated'

export const getNetworkporttypes = () =>
  getAll<NetworkPortType>(ENDPOINTS.DROPDOWNS_NETWORKPORTTYPE)

export const getNetworkporttypeById = (id: number) =>
  getById<NetworkPortType>(ENDPOINTS.DROPDOWNS_NETWORKPORTTYPE, id)
