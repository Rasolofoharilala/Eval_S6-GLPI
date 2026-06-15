// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/Network.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { Network } from '@/types/generated'

export type { Network } from '@/types/generated'

export const getNetworks = () => getAll<Network>(ENDPOINTS.DROPDOWNS_NETWORK)

export const getNetworkById = (id: number) => getById<Network>(ENDPOINTS.DROPDOWNS_NETWORK, id)
