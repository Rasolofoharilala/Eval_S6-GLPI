// Auto-generated file. Do not edit manually.
// Service generated for /Administration/User/Me/ManagedItem.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getManageditems = () =>
  getAll(ENDPOINTS.ADMINISTRATION_USER_ME_MANAGEDITEM)
