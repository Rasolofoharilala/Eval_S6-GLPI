// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DomainType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { DomainType } from '@/types/generated'

export type { DomainType } from '@/types/generated'

export const getDomaintypes = () => getAll<DomainType>(ENDPOINTS.DROPDOWNS_DOMAINTYPE)

export const getDomaintypeById = (id: number) =>
  getById<DomainType>(ENDPOINTS.DROPDOWNS_DOMAINTYPE, id)
