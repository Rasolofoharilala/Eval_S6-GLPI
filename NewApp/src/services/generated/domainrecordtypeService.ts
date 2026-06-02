// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DomainRecordType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getDomainrecordtypes = () =>
  getAll(ENDPOINTS.DROPDOWNS_DOMAINRECORDTYPE)

export const getDomainrecordtypeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_DOMAINRECORDTYPE, id)
