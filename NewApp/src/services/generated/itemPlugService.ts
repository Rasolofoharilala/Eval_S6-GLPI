// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/Item_Plug.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { ItemPlug } from '@/types/generated'

export type { ItemPlug } from '@/types/generated'

export const getItemplugs = () => getAll<ItemPlug>(ENDPOINTS.DROPDOWNS_ITEM_PLUG)

export const getItemPlugById = (id: number) => getById<ItemPlug>(ENDPOINTS.DROPDOWNS_ITEM_PLUG, id)
