// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/ExternalEvent.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { ExternalEvent } from '@/types/generated'

export type { ExternalEvent } from '@/types/generated'

export const getExternalevents = () => getAll<ExternalEvent>(ENDPOINTS.ASSISTANCE_EXTERNALEVENT)

export const getExternaleventById = (id: number) =>
  getById<ExternalEvent>(ENDPOINTS.ASSISTANCE_EXTERNALEVENT, id)
