// Auto-generated file. Do not edit manually.
// Service generated for /Management/DataCenter.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { DataCenter } from '@/types/generated'

export type { DataCenter } from '@/types/generated'

export const getDatacenters = () => getAll<DataCenter>(ENDPOINTS.MANAGEMENT_DATACENTER)

export const getDatacenterById = (id: number) =>
  getById<DataCenter>(ENDPOINTS.MANAGEMENT_DATACENTER, id)
