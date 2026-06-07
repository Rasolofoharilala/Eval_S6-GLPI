// Auto-generated file. Do not edit manually.
// Service generated for /Administration/User.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { User } from '@/types/generated'

export type { User } from '@/types/generated'

export const getUsers = () => getAll<User>(ENDPOINTS.ADMINISTRATION_USER)

export const getUserById = (id: number) => getById<User>(ENDPOINTS.ADMINISTRATION_USER, id)
