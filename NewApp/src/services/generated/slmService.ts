// Auto-generated file. Do not edit manually.
// Service generated for /Setup/SLM.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { SLM } from '@/types/generated'

export type { SLM } from '@/types/generated'

export const getSlms = () => getAll<SLM>(ENDPOINTS.SETUP_SLM)

export const getSlmById = (id: number) => getById<SLM>(ENDPOINTS.SETUP_SLM, id)
