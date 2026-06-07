// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ClusterType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getClustertypes = () => getAll(ENDPOINTS.DROPDOWNS_CLUSTERTYPE)

export const getClustertypeById = (id: number) => getById(ENDPOINTS.DROPDOWNS_CLUSTERTYPE, id)
