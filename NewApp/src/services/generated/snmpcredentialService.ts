// Auto-generated file. Do not edit manually.
// Service generated for /Inventory/SNMPCredential.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getSnmpcredentials = () => getAll(ENDPOINTS.INVENTORY_SNMPCREDENTIAL)

export const getSnmpcredentialById = (id: number) => getById(ENDPOINTS.INVENTORY_SNMPCREDENTIAL, id)
