// Auto-generated file. Do not edit manually.
// Service generated for /Management/Cluster.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Cluster } from '@/types/generated'

export type { Cluster } from '@/types/generated'

export const getClusters = () => getAll<Cluster>(ENDPOINTS.MANAGEMENT_CLUSTER)

export const getClusterById = (id: number) => getById<Cluster>(ENDPOINTS.MANAGEMENT_CLUSTER, id)
