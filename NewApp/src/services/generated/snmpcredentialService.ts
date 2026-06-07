// Auto-generated file. Do not edit manually.
// Service generated for /Inventory/SNMPCredential.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { SNMPCredential } from '@/types/generated'

export type { SNMPCredential } from '@/types/generated'

export const getSnmpcredentials = () => getAll<SNMPCredential>(ENDPOINTS.INVENTORY_SNMPCREDENTIAL)

export const getSnmpcredentialById = (id: number) =>
  getById<SNMPCredential>(ENDPOINTS.INVENTORY_SNMPCREDENTIAL, id)
