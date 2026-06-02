// Auto-generated file. Do not edit manually.
// Service generated for /Setup/SLM.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getSlms = () =>
  getAll(ENDPOINTS.SETUP_SLM)

export const getSlmById = (id: number) =>
  getById(ENDPOINTS.SETUP_SLM, id)
