// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/PhonePowerSupply.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPhonepowersupplies = () =>
  getAll(ENDPOINTS.DROPDOWNS_PHONEPOWERSUPPLY)

export const getPhonepowersupplyById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_PHONEPOWERSUPPLY, id)
