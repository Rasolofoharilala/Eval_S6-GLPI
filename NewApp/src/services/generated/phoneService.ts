// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Phone.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Phone } from '@/types/generated'

export type { Phone } from '@/types/generated'

export const getPhones = () => getAll<Phone>(ENDPOINTS.ASSETS_PHONE)

export const getPhoneById = (id: number) => getById<Phone>(ENDPOINTS.ASSETS_PHONE, id)
