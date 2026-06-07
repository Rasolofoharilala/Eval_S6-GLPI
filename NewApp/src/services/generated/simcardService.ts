// Auto-generated file. Do not edit manually.
// Service generated for /Components/SIMCard.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { SIMCard } from '@/types/generated'

export type { SIMCard } from '@/types/generated'

export const getSimcards = () => getAll<SIMCard>(ENDPOINTS.COMPONENTS_SIMCARD)

export const getSimcardById = (id: number) => getById<SIMCard>(ENDPOINTS.COMPONENTS_SIMCARD, id)
