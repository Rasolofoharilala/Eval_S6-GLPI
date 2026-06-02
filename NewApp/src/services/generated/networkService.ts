// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/Network.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getNetworks = () =>
  getAll(ENDPOINTS.DROPDOWNS_NETWORK)

export const getNetworkById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_NETWORK, id)
