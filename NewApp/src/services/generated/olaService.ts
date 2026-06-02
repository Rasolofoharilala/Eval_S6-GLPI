// Auto-generated file. Do not edit manually.
// Service generated for /Setup/OLA.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getOlas = () =>
  getAll(ENDPOINTS.SETUP_OLA)

export const getOlaById = (id: number) =>
  getById(ENDPOINTS.SETUP_OLA, id)
