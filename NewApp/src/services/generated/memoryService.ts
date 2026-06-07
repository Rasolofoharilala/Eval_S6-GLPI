// Auto-generated file. Do not edit manually.
// Service generated for /Components/Memory.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Memory } from '@/types/generated'

export type { Memory } from '@/types/generated'

export const getMemories = () => getAll<Memory>(ENDPOINTS.COMPONENTS_MEMORY)

export const getMemoryById = (id: number) => getById<Memory>(ENDPOINTS.COMPONENTS_MEMORY, id)
