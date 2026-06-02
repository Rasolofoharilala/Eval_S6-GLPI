// Auto-generated file. Do not edit manually.
// Service generated for /Components/Memory.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getMemories = () =>
  getAll(ENDPOINTS.COMPONENTS_MEMORY)

export const getMemoryById = (id: number) =>
  getById(ENDPOINTS.COMPONENTS_MEMORY, id)
