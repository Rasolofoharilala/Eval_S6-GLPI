// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/CloseTime.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getClosetimes = () =>
  getAll(ENDPOINTS.DROPDOWNS_CLOSETIME)

export const getClosetimeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_CLOSETIME, id)
