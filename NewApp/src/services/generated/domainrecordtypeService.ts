// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DomainRecordType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { DomainRecordType } from '@/types/generated'

export type { DomainRecordType } from '@/types/generated'

export const getDomainrecordtypes = () =>
  getAll<DomainRecordType>(ENDPOINTS.DROPDOWNS_DOMAINRECORDTYPE)

export const getDomainrecordtypeById = (id: number) =>
  getById<DomainRecordType>(ENDPOINTS.DROPDOWNS_DOMAINRECORDTYPE, id)
