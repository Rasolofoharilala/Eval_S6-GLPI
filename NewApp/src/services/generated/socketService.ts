// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Socket.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getSockets = () => getAll(ENDPOINTS.ASSETS_SOCKET)

export const getSocketById = (id: number) => getById(ENDPOINTS.ASSETS_SOCKET, id)
