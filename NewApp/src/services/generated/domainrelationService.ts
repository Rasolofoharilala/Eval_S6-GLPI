// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DomainRelation.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { DomainRelation } from '@/types/generated'

export type { DomainRelation } from '@/types/generated'

export const getDomainrelations = () => getAll<DomainRelation>(ENDPOINTS.DROPDOWNS_DOMAINRELATION)

export const getDomainrelationById = (id: number) =>
  getById<DomainRelation>(ENDPOINTS.DROPDOWNS_DOMAINRELATION, id)
