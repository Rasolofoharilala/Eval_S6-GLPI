// Auto-generated file. Do not edit manually.
// Service generated for /Inventory/LockedField.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getLockedfields = () =>
  getAll(ENDPOINTS.INVENTORY_LOCKEDFIELD)

export const getLockedfieldById = (id: number) =>
  getById(ENDPOINTS.INVENTORY_LOCKEDFIELD, id)
