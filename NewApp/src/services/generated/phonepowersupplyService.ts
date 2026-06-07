// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/PhonePowerSupply.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { PhonePowerSupply } from '@/types/generated'

export type { PhonePowerSupply } from '@/types/generated'

export const getPhonepowersupplies = () =>
  getAll<PhonePowerSupply>(ENDPOINTS.DROPDOWNS_PHONEPOWERSUPPLY)

export const getPhonepowersupplyById = (id: number) =>
  getById<PhonePowerSupply>(ENDPOINTS.DROPDOWNS_PHONEPOWERSUPPLY, id)
