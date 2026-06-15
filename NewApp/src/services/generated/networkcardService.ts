// Auto-generated file. Do not edit manually.
// Service generated for /Components/NetworkCard.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { NetworkCard } from '@/types/generated'

export type { NetworkCard } from '@/types/generated'

export const getNetworkcards = () => getAll<NetworkCard>(ENDPOINTS.COMPONENTS_NETWORKCARD)

export const getNetworkcardById = (id: number) =>
  getById<NetworkCard>(ENDPOINTS.COMPONENTS_NETWORKCARD, id)
