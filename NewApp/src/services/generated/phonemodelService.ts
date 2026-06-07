// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/PhoneModel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { PhoneModel } from '@/types/generated'

export type { PhoneModel } from '@/types/generated'

export const getPhonemodels = () => getAll<PhoneModel>(ENDPOINTS.DROPDOWNS_PHONEMODEL)

export const getPhonemodelById = (id: number) =>
  getById<PhoneModel>(ENDPOINTS.DROPDOWNS_PHONEMODEL, id)
