// Auto-generated file. Do not edit manually.
// Service generated for /Administration/User.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getUsers = () => getAll(ENDPOINTS.ADMINISTRATION_USER)

export const getUserById = (id: number) => getById(ENDPOINTS.ADMINISTRATION_USER, id)
