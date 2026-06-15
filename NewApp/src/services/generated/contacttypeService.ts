// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ContactType.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { ContactType } from '@/types/generated'

export type { ContactType } from '@/types/generated'

export const getContacttypes = () => getAll<ContactType>(ENDPOINTS.DROPDOWNS_CONTACTTYPE)

export const getContacttypeById = (id: number) =>
  getById<ContactType>(ENDPOINTS.DROPDOWNS_CONTACTTYPE, id)
