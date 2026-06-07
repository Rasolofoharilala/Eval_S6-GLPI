// Auto-generated file. Do not edit manually.
// Service generated for /Management/DataCenter.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getDatacenters = () => getAll(ENDPOINTS.MANAGEMENT_DATACENTER)

export const getDatacenterById = (id: number) => getById(ENDPOINTS.MANAGEMENT_DATACENTER, id)
