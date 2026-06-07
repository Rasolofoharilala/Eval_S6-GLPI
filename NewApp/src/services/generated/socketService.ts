// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Socket.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Socket } from '@/types/generated'

export type { Socket } from '@/types/generated'

export const getSockets = () => getAll<Socket>(ENDPOINTS.ASSETS_SOCKET)

export const getSocketById = (id: number) => getById<Socket>(ENDPOINTS.ASSETS_SOCKET, id)
