// Auto-generated file. Do not edit manually.
// Service generated for /Components/Processor.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Processor } from '@/types/generated'

export type { Processor } from '@/types/generated'

export const getProcessors = () => getAll<Processor>(ENDPOINTS.COMPONENTS_PROCESSOR)

export const getProcessorById = (id: number) =>
  getById<Processor>(ENDPOINTS.COMPONENTS_PROCESSOR, id)
