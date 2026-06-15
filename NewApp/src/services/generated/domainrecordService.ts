// Auto-generated file. Do not edit manually.
// Service generated for /Management/DomainRecord.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { DomainRecord } from '@/types/generated'

export type { DomainRecord } from '@/types/generated'

export const getDomainrecords = () => getAll<DomainRecord>(ENDPOINTS.MANAGEMENT_DOMAINRECORD)

export const getDomainrecordById = (id: number) =>
  getById<DomainRecord>(ENDPOINTS.MANAGEMENT_DOMAINRECORD, id)
