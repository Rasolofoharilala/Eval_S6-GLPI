// Auto-generated file. Do not edit manually.
// Service generated for /Administration/User/Me/UsedItem.

import { getAll } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getUseditems = () => getAll<unknown>(ENDPOINTS.ADMINISTRATION_USER_ME_USEDITEM)
