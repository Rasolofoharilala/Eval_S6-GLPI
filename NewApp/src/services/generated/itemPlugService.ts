// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/Item_Plug.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getItemplugs = () =>
  getAll(ENDPOINTS.DROPDOWNS_ITEM_PLUG)

export const getItemPlugById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_ITEM_PLUG, id)
