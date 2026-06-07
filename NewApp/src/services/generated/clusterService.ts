// Auto-generated file. Do not edit manually.
// Service generated for /Management/Cluster.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getClusters = () => getAll(ENDPOINTS.MANAGEMENT_CLUSTER)

export const getClusterById = (id: number) => getById(ENDPOINTS.MANAGEMENT_CLUSTER, id)
