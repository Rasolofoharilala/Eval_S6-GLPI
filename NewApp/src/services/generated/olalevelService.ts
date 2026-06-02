// Auto-generated file. Do not edit manually.
// Service generated for /Setup/OLALevel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getOlalevels = () =>
  getAll(ENDPOINTS.SETUP_OLALEVEL)

export const getOlalevelById = (id: number) =>
  getById(ENDPOINTS.SETUP_OLALEVEL, id)
