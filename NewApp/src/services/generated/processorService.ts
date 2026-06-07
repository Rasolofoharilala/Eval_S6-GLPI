// Auto-generated file. Do not edit manually.
// Service generated for /Components/Processor.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getProcessors = () => getAll(ENDPOINTS.COMPONENTS_PROCESSOR)

export const getProcessorById = (id: number) => getById(ENDPOINTS.COMPONENTS_PROCESSOR, id)
