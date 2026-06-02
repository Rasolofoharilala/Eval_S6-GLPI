// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DomainRelation.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getDomainrelations = () =>
  getAll(ENDPOINTS.DROPDOWNS_DOMAINRELATION)

export const getDomainrelationById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_DOMAINRELATION, id)
