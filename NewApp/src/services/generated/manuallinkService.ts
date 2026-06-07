// Auto-generated file. Do not edit manually.
// Service generated for /Setup/ManualLink.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { ManualLink } from '@/types/generated'

export type { ManualLink } from '@/types/generated'

export const getManuallinks = () => getAll<ManualLink>(ENDPOINTS.SETUP_MANUALLINK)

export const getManuallinkById = (id: number) => getById<ManualLink>(ENDPOINTS.SETUP_MANUALLINK, id)
