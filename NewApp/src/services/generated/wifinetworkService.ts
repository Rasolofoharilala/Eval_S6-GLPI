// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/WifiNetwork.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getWifinetworks = () => getAll(ENDPOINTS.DROPDOWNS_WIFINETWORK)

export const getWifinetworkById = (id: number) => getById(ENDPOINTS.DROPDOWNS_WIFINETWORK, id)
