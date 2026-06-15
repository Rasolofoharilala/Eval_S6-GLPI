// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/PhoneType.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { PhoneType } from '@/types/generated'

export type { PhoneType } from '@/types/generated'

export const getPhonetypes = () => getAll<PhoneType>(ENDPOINTS.DROPDOWNS_PHONETYPE)

export const getPhonetypeById = (id: number) =>
  getById<PhoneType>(ENDPOINTS.DROPDOWNS_PHONETYPE, id)
