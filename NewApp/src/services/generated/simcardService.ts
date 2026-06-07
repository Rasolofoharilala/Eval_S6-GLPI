// Auto-generated file. Do not edit manually.
// Service generated for /Components/SIMCard.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getSimcards = () => getAll(ENDPOINTS.COMPONENTS_SIMCARD)

export const getSimcardById = (id: number) => getById(ENDPOINTS.COMPONENTS_SIMCARD, id)
