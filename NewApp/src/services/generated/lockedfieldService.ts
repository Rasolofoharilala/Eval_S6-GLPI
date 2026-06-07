// Auto-generated file. Do not edit manually.
// Service generated for /Inventory/LockedField.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { LockedField } from '@/types/generated'

export type { LockedField } from '@/types/generated'

export const getLockedfields = () => getAll<LockedField>(ENDPOINTS.INVENTORY_LOCKEDFIELD)

export const getLockedfieldById = (id: number) =>
  getById<LockedField>(ENDPOINTS.INVENTORY_LOCKEDFIELD, id)
