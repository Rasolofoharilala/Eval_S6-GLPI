// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Unmanaged.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { Unmanaged } from '@/types/generated'

export type { Unmanaged } from '@/types/generated'

export const getUnmanageds = () => getAll<Unmanaged>(ENDPOINTS.ASSETS_UNMANAGED)

export const getUnmanagedById = (id: number) => getById<Unmanaged>(ENDPOINTS.ASSETS_UNMANAGED, id)
