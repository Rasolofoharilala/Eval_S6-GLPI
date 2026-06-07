// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CloseTime.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { CloseTime } from '@/types/generated'

export type { CloseTime } from '@/types/generated'

export const getClosetimes = () => getAll<CloseTime>(ENDPOINTS.DROPDOWNS_CLOSETIME)

export const getClosetimeById = (id: number) =>
  getById<CloseTime>(ENDPOINTS.DROPDOWNS_CLOSETIME, id)
