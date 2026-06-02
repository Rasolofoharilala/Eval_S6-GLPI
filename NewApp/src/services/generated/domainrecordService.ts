// Auto-generated file. Do not edit manually.
// Service generated for /Management/DomainRecord.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getDomainrecords = () =>
  getAll(ENDPOINTS.MANAGEMENT_DOMAINRECORD)

export const getDomainrecordById = (id: number) =>
  getById(ENDPOINTS.MANAGEMENT_DOMAINRECORD, id)
