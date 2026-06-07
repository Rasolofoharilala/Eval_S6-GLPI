// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/State.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { State } from '@/types/generated'

export type { State } from '@/types/generated'

export const getStates = () => getAll<State>(ENDPOINTS.DROPDOWNS_STATE)

export const getStateById = (id: number) => getById<State>(ENDPOINTS.DROPDOWNS_STATE, id)
