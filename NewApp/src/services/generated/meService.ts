// Auto-generated file. Do not edit manually.
// Service generated for /Administration/User/Me.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { User } from '@/types/generated'

export type { User } from '@/types/generated'

export const getMes = () => getAll<User>(ENDPOINTS.ADMINISTRATION_USER_ME)
