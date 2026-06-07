// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Phone.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPhones = () => getAll(ENDPOINTS.ASSETS_PHONE)

export const getPhoneById = (id: number) => getById(ENDPOINTS.ASSETS_PHONE, id)
