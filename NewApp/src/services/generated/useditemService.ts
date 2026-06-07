// Auto-generated file. Do not edit manually.
// Service generated for /Administration/User/Me/UsedItem.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getUseditems = () => getAll(ENDPOINTS.ADMINISTRATION_USER_ME_USEDITEM)
