// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/WifiNetwork.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { WifiNetwork } from '@/types/generated'

export type { WifiNetwork } from '@/types/generated'

export const getWifinetworks = () => getAll<WifiNetwork>(ENDPOINTS.DROPDOWNS_WIFINETWORK)

export const getWifinetworkById = (id: number) =>
  getById<WifiNetwork>(ENDPOINTS.DROPDOWNS_WIFINETWORK, id)
