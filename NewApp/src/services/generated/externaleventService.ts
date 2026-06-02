// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/ExternalEvent.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getExternalevents = () =>
  getAll(ENDPOINTS.ASSISTANCE_EXTERNALEVENT)

export const getExternaleventById = (id: number) =>
  getById(ENDPOINTS.ASSISTANCE_EXTERNALEVENT, id)
