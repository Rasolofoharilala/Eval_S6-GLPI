// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/PhoneModel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPhonemodels = () =>
  getAll(ENDPOINTS.DROPDOWNS_PHONEMODEL)

export const getPhonemodelById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_PHONEMODEL, id)
